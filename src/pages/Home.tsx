import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/categories";
import Layout from "../Layout";
import { Category } from "../types/category";
import Modal from "../modals/Modal";
import RequestToAddCategory from "../modals/RequestToAddCategory";

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout mainClassname="flex-grow py-8 px-4 xl:px-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">კატეგორიები</h1>
          <p className="text-gray-600">
            მოგესალმებით! შექმენით რეკომენდაციები კატეგორიებში და გაგვიზიარეთ
            თქვენი შეფასება.
          </p>
          <p className="text-gray-600 mt-2">ვერ იპოვე სასურველი კატეგორია? </p>
          <button
            className="mt-2 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={openModal}
          >
            მოითხოვე დამატება
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 "
            >
              <div className="p-6 flex justify-center items-center ">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <RequestToAddCategory
          onClose={closeModal}
          // updateRecommendations={updateRecommendations}
        />
      </Modal>
    </Layout>
  );
};

export default Home;
