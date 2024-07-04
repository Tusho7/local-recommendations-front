import axiosInstance from "../plugins/axios/index";

export const contact = async ({
  name,
  userEmail: email,
  message,
}: {
  name: string;
  userEmail: string;
  message: string;
}) => {
  return await axiosInstance.post("/contact", { name, email, message });
};

export const addCategoryRequest = async ({
  categoryName,
  userEmail: email,
  comment,
}: {
  categoryName: string;
  userEmail: string;
  comment: string;
}) => {
  return await axiosInstance.post("/request_to_add_category", {
    categoryName,
    email,
    comment,
  });
};
