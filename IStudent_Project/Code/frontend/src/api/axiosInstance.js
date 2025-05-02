import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9090/api/v1",
});

axiosInstance.defaults.headers.common["Accept"] = "application/json";
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.put["Content-Type"] = "application/json";
axiosInstance.defaults.headers.delete["Content-Type"] = "application/json";
axiosInstance.defaults.headers.patch["Content-Type"] = "application/json";
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
