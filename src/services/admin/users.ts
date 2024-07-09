import axiosInstance from "../../plugins/axios/index";

export const getUsers = async () => {
  return await axiosInstance.get("/api/auth/users");
};

export const blockUnblockUser = async (id: number) => {
  return await axiosInstance.patch(`/api/auth/block_unblock/${id}`);
};

export const deleteUser = async (id: number) => {
  return await axiosInstance.delete(`/api/auth/delete_user/${id}`);
};
