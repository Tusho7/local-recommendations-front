import axiosInstance from "../../plugins/axios/index";

export const getRecommendations = async () => {
  return await axiosInstance.get("/get_all_recommendations");
};

export const deleteRecommendationByAdmin = async (id: number) => {
  return await axiosInstance.delete(`/delete_recommendation_byAdmin/${id}`);
};
