import axiosInstance, { formDataInstance } from "../../plugins/axios/index";
import { UserUpdate } from "../../types/user";

export const InitializeCSRFProtection = async () => {
  return await axiosInstance.get("/sanctum/csrf-cookie");
};

export const registerUser = async (formData: FormData) => {
  return await formDataInstance.post("/api/auth/register", formData);
};

export const verifyUser = async (email: string, verificationCode: string) => {
  const response = await axiosInstance.get("/api/auth/verify", {
    params: {
      email,
      verificationCode,
    },
  });
  return response.data;
};

export const Logout = async () => {
  return await axiosInstance.post("/api/auth/logout");
};

export const loginUser = async (email: string, password: string) => {
  return await axiosInstance.post("/api/auth/login", { email, password });
};

export const forgotPassword = async (email: string) => {
  return await axiosInstance.post("/api/auth/forgot-password", { email });
};

export const logoutUser = async () => {
  return await axiosInstance.post("/api/auth/logout");
};

export const UpdateUser = async (
  userId: number | undefined,
  formData: UserUpdate
) => {
  return await axiosInstance.put(`/api/auth/${userId}`, formData);
};
