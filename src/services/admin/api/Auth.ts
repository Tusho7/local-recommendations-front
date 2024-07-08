import axiosInstance from "../../../plugins/axios/index";

export const InitializeCSRFProtection = async () => {
  return await axiosInstance.get("/sanctum/csrf-cookie");
};

export const registerAdmin = async (formData: FormData) => {
  return await axiosInstance.post("/register_admin", formData);
};

export const Logout = async () => {
  return await axiosInstance.post("/logout_admin");
};

export const loginAdmin = async (email: string, password: string) => {
  return await axiosInstance.post("/login_admin", { email, password });
};
