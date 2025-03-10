import axiosInstance from "../plugins/axios/index";

export const getCategories = async () => {
  return await axiosInstance.get("/get_categories");
};

export const getCategoryNamesByIds = async (categoryId: number) => {
  return await axiosInstance.get(`/get_category_name/${categoryId}`);
};
