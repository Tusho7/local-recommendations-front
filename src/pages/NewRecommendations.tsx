import { useEffect, useState } from "react";
import Layout from "../Layout";
import { useNotifications } from "../contexts/UseNotification";
import { getCategoryNamesByIds } from "../services/categories";

const NewRecommendations = () => {
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const notifications = useNotifications();

  useEffect(() => {
    const fetchCategoryNames = async () => {
      try {
        const categoryNames = await Promise.all(
          notifications.notifications.map(async (notification) => {
            const response = await getCategoryNamesByIds(
              notification.categoryId
            );
            return response.data.category.name;
          })
        );
        setCategoryNames(categoryNames);
      } catch (error) {
        console.error("Error fetching category names:", error);
      }
    };

    if (notifications.notifications.length > 0) {
      fetchCategoryNames();
    }
  }, [notifications]);

  const toggleCategory = (index: number) => {
    if (expandedCategory === index) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(index);
    }
  };

  return (
    <Layout mainClassname="flex-grow py-8 px-4 xl:px-0 ">
      <div className="flex justify-center items-center gap-4 mb-16 max-w-[1200px] mx-auto">
        <h2 className="text-4xl">ახალი ობიექტები</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-w-[1200px] mx-auto">
        {categoryNames &&
          categoryNames.map((categoryName, index) => (
            <div
              key={index}
              onClick={() => toggleCategory(index)}
              style={{ cursor: "pointer" }}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer text-center"
            >
              <div className="p-6">
                <p className="text-xl">კატეგორია: {categoryName}</p>
              </div>
              {expandedCategory === index && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                  <ul className="px-6 pb-2">
                    {notifications.notifications
                      .filter(
                        (notification) =>
                          notification.categoryId ===
                          notifications.notifications[index].categoryId
                      )
                      .map((notification, notificationIndex) => (
                        <li
                          key={notificationIndex}
                          className="flex flex-col items-start my-2"
                        >
                          <p>
                            <span className="text-lg font-semibold">
                              სახელი:{" "}
                            </span>{" "}
                            {notification.name}
                          </p>
                          <p>
                            {" "}
                            <span className="text-lg font-semibold">
                              შეფასება:
                            </span>{" "}
                            {notification.review}
                          </p>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        {notifications.notifications.length === 0 && (
          <p>ახალი ობიექტები არ არის</p>
        )}
      </div>
    </Layout>
  );
};

export default NewRecommendations;
