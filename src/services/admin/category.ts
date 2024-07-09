import axiosInstance from "../../plugins/axios/index";

export const deleteCategory = async (id: number) => {
  return await axiosInstance.delete(`/delete_category/${id}`);
};
