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
