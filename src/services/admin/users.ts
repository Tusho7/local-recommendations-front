import axiosInstance from "../../plugins/axios/index";

export const getUsers = async () => {
  return await axiosInstance.get("/api/auth/users");
};
