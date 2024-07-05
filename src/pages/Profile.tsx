import { useEffect, useState } from "react";
import Layout from "../Layout";
import {
  deleteRecommendationById,
  getRecommendationByUserId,
} from "../services/recommendations";
import { useUser } from "../contexts/UseUser";
import Swal from "sweetalert2";
import { RecommendationPropsForProfile } from "../types/recommendation";
import Loading from "../components/Loading";

const Profile = () => {
  const { user } = useUser();
  const [recommendations, setRecommendations] = useState<
    RecommendationPropsForProfile[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [expandedReviews, setExpandedReviews] = useState<{
    [key: number]: boolean;
  }>({});

  const userId = user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRecommendations = await getRecommendationByUserId(userId);
        setRecommendations(userRecommendations.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const toggleReview = (id: number) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "დარწმუნებული ხარ?",
      text: "რეკომენდაცია წაიშლება!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "დიახ, წაშალე!",
      cancelButtonText: "გაუქმება",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteRecommendationById(id);
        console.log(response);
        setRecommendations(recommendations.filter((rec) => rec.id !== id));
        Swal.fire("წაშლილია!", "რეკომენდაცია წარმატებით წაიშალა.", "success");
      } catch (error) {
        console.error("Error deleting recommendation:", error);
        Swal.fire("შეცდომა!", "რეკომენდაცია ვერ წაიშალა.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <Layout mainClassname="flex-grow py-8 px-4 xl:px-0">
      <div className="max-w-[1200px] mx-auto">
        <div className="user-info bg-white p-6 rounded-lg shadow-md mb-6 flex items-center gap-4">
          <img
            src={`${import.meta.env.VITE_API_STORAGE}${user?.profilePicture}`}
            alt="User"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">{`${user?.firstName} ${user?.lastName}`}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="user-recommendations bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">ჩემი რეკომენდაციები</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="p-4 border rounded-lg hover:shadow-lg transition duration-300 relative"
              >
                <p className="text-gray-700 mb-2 text-lg">
                  <strong>კატეგორია:</strong> {recommendation.Category?.name}
                </p>
                <h3 className="font-semibold mb-2">
                  ობიექტი: {recommendation.name}
                </h3>

                <p className="text-gray-700 mb-2">
                  <p className="font-semibold">შეფასება:</p>
                  {expandedReviews[recommendation.id] ||
                  recommendation.review.length <= 50
                    ? recommendation.review
                    : `${recommendation.review.slice(0, 50)}...`}
                  {recommendation.review.length > 50 && (
                    <button
                      onClick={() => toggleReview(recommendation.id)}
                      className="text-blue-500 ml-2"
                    >
                      {expandedReviews[recommendation.id]
                        ? "ნახე ნაკლები"
                        : "ნახე მეტი"}
                    </button>
                  )}
                </p>
                {recommendation.address && (
                  <p className="text-gray-700 mb-2">
                    <strong>მისამართი:</strong> {recommendation.address}
                  </p>
                )}
                {recommendation.phoneNumber && (
                  <p className="text-gray-700 mb-2">
                    <strong>ტელეფონი:</strong> {recommendation.phoneNumber}
                  </p>
                )}
                {recommendation.website && (
                  <p className="text-gray-700 mb-2">
                    <strong>ვებსაიტი:</strong>{" "}
                    <a
                      href={recommendation.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {recommendation.website}
                    </a>
                  </p>
                )}
                <button
                  onClick={() => handleDelete(recommendation.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  წაშლა
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
