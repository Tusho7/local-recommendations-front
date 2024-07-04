import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await getRecommendationsByCategoryId(id);
        console.log(response);

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
    };

    fetchRecommendations();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout mainClassname="flex-grow py-8 px-4 xl:px-0">
      {loading && <Loading />}

      <div className="flex justify-between items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">რეკომენდაციები</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={openModal}
        >
          დაამატე რეკომენდაცია
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {recommendations.map(
          (recommendation: RecommendationProps, index: number) => (
            <div
              key={index}
              className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="p-6 flex justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 text-center">
                  {recommendation.name ? (
                    <p>ობიექტი: {recommendation.name}</p>
                  ) : (
                    <span className="text-red-500 text-center">
                      ამ კატეგორიაში არ არის რეკომენდაციები
                    </span>
                  )}
                </h2>
              </div>
            </div>
          )
        )}

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <AddRecommendation onClose={closeModal} />
        </Modal>
      </div>
    </Layout>
  );
};

export default Recommendations;
