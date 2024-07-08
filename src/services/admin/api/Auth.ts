import axiosInstance from "../../../plugins/axios/index";

export const registerAdmin = async (formData: FormData) => {
  return await axiosInstance.post("/api/auth/register", formData);
};

export const Logout = async () => {
  return await axiosInstance.post("/api/auth/logout");
};

export const loginAdmin = async (email: string, password: string) => {
  return await axiosInstance.post("/login_admin", { email, password });
};
