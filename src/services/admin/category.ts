import axiosInstance from "../../plugins/axios/index";

export const deleteCategory = async (id: number) => {
  return await axiosInstance.delete(`/delete_category/${id}`);
};

export const updateCategory = async (id: number, data: { name: string }) => {
  return await axiosInstance.put(`/update_category/${id}`, data);
};
