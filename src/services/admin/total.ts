import axiosInstance from "../../plugins/axios/index";

export const totalUsers = async () => {
  return await axiosInstance.get("/api/auth/total_users");
};

export const totalCategories = async () => {
  return await axiosInstance.get("/total_categories");
};

export const totalRecommendations = async () => {
  return await axiosInstance.get("/total_recommendations");
};
