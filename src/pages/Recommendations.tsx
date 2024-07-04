import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecommendationsByCategoryId } from "../services/recommendations";
import Loading from "../components/Loading";
import Layout from "../Layout";
import { RecommendationProps } from "../types/recommendation";
import Modal from "../modals/Modal";
import AddRecommendation from "../modals/AddRecommendation";

const Recommendations = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<RecommendationProps[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRecommendationId, setExpandedRecommendationId] = useState<
    string | null
  >(null);
  const [expanded, setExpanded] = useState(false);

  const fetchRecommendations = useCallback(async () => {
    try {
      const response = await getRecommendationsByCategoryId(id);
      if (Array.isArray(response.data)) {
        setRecommendations(response.data);
      } else {
        setRecommendations([response.data.message]);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations, id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleRecommendation = (recommendationId: string) => {
    setExpandedRecommendationId((prevId) =>
      prevId === recommendationId ? null : recommendationId
    );
  };

  const updateRecommendations = () => {
    fetchRecommendations();
  };

  return (
    <Layout mainClassname="flex-grow py-8 px-4 xl:px-0 ">
      {loading && <Loading />}

      <div className="flex justify-between items-center gap-4 mb-4 max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-bold">რეკომენდაციები</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={openModal}
        >
          დაამატე რეკომენდაცია
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-w-[1200px] mx-auto">
        {recommendations.map(
          (recommendation: RecommendationProps, index: number) => (
            <div
              key={index}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
            >
              <div
                className="p-6 flex justify-center items-center"
                onClick={() => toggleRecommendation(recommendation.id)}
              >
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 text-center">
                  {recommendation.name ? (
                    <div>
                      {recommendation.name}
                      <span className="text-sm block text-gray-500">
                        დაამატა {recommendation.User?.firstName}{" "}
                        {recommendation.User?.lastName}
                      </span>
                    </div>
                  ) : (
                    <span className="text-red-500 text-center">
                      ამ კატეგორიაში არ არის რეკომენდაციები
                    </span>
                  )}
                </h2>
              </div>
              {expandedRecommendationId === recommendation.id && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                  <div className="p-4">
                    <p className="text-gray-900  mb-2">
                      <span className="text-lg font-semibold">შეფასება: </span>
                      {expanded ? (
                        <span>{recommendation.review}</span>
                      ) : (
                        <span className="font-normal">
                          {recommendation.review.slice(0, 100)}
                          {recommendation.review.length > 50 && "..."}
                        </span>
                      )}
                      {recommendation.review.length > 100 && (
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => setExpanded(!expanded)}
                        >
                          {expanded ? "ნაკლების ჩვენება" : "მეტის ჩვენება"}
                        </button>
                      )}
                    </p>

                    {recommendation.address.length > 0 ? (
                      <p className="text-gray-700 mb-2">
                        <span className="text-lg font-semibold">
                          მისამართი:
                        </span>{" "}
                        {recommendation.address}
                      </p>
                    ) : (
                      <p className="text-red-500 mb-2">
                        მისამართი არ არის დამატებული
                      </p>
                    )}
                    {recommendation.phoneNumber.length > 0 ? (
                      <p className="text-gray-700 mb-2">
                        <span className="text-lg font-semibold">ტელეფონი:</span>{" "}
                        {recommendation.phoneNumber}
                      </p>
                    ) : (
                      <p className="text-red-500 mb-2">
                        ტელეფონი არ არის დამატებული
                      </p>
                    )}
                    {recommendation.website.length > 0 ? (
                      <p className="text-gray-700 mb-2">
                        <span className="text-lg font-semibold">ვებსაიტი:</span>{" "}
                        {recommendation.website}
                      </p>
                    ) : (
                      <p className="text-red-500 mb-2">
                        ვებსაიტი არ არის დამატებული
                      </p>
                    )}
                    <p className="text-gray-700 mb-2">
                      <span className="text-lg font-semibold">კატეგორია:</span>{" "}
                      {recommendation.Category?.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddRecommendation
            onClose={closeModal}
            updateRecommendations={updateRecommendations}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default Recommendations;
