import axiosInstance from "../plugins/axios/index";
import { RecommendationData } from "../types/recommendation";

export const getRecommendationsByCategoryId = async (
  categoryId: string | undefined
) => {
  return await axiosInstance.get(
    `/get_recommendation_by_categoryID/${categoryId}`
  );
};

export const createRecommendation = async (data: RecommendationData) => {
  return await axiosInstance.post("/create_recommendation", data);
};

export const getRecommendationByUserId = async (userId: number | undefined) => {
  return await axiosInstance.get(`/get_recommendations_by_userId/${userId}`);
};

export const deleteRecommendationById = async (id: number) => {
  return await axiosInstance.delete(`/delete_recommendation/${id}`);
};

export const updateRecommendationById = async (
  id: number,
  data: RecommendationData
) => {
  return await axiosInstance.put(`/update_recommendation/${id}`, data);
};
