import { useEffect, useState } from "react";
import {
  getRecommendations,
  deleteRecommendationByAdmin,
} from "../../services/admin/recommendations";
import { RecommendationPropsForProfile } from "../../types/recommendation";
import Swal from "sweetalert2";

const AdminRecommendations = () => {
  const [recommendations, setRecommendations] = useState<
    RecommendationPropsForProfile[]
  >([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await getRecommendations();
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleDeleteRecommendation = async (id: number) => {
    Swal.fire({
      title: "ნამდვილად გსურთ წაშლა?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "დიახ!",
      cancelButtonText: "გაუქმება",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRecommendationByAdmin(id);
          setRecommendations(recommendations.filter((rec) => rec.id !== id));
          Swal.fire("წაშლილია!", "რეკომენდაცია წარმატებით წაიშალა.", "success");
        } catch (error) {
          Swal.fire("Error!", `დაფიქსირდა შეცდომა: ${error}`, "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">რეკომენდაციები</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {recommendation.name}
              </h2>
              <div className="mb-4">
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">კატეგორია:</span>{" "}
                  {recommendation.Category?.name}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">შემქმნელი:</span>{" "}
                  {`${recommendation.User?.firstName} ${recommendation.User?.lastName}`}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">მისამართი:</span>{" "}
                  {recommendation.address || "N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">ტელეფონი:</span>{" "}
                  {recommendation.phoneNumber || "N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">საიტი:</span>{" "}
                  {recommendation.website ? (
                    <a
                      href={recommendation.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {recommendation.website}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">შეფასება:</span>{" "}
                {recommendation.review}
              </div>
            </div>
            <div className="flex justify-end px-6 py-4 bg-gray-100">
              <button
                className="text-md text-red-500 hover:text-red-700 focus:outline-none"
                onClick={() => handleDeleteRecommendation(recommendation.id)}
              >
                წაშლა
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRecommendations;
