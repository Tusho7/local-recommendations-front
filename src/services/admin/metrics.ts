import axiosInstance from "../../plugins/axios/index";

export const totalMetrics = async () => {
  return await axiosInstance.get("/metrics");
};
