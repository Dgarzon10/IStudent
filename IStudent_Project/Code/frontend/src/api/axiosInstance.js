import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9090/api/v1",
});

export default axiosInstance;
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
export const setContentType = (contentType) => {
  if (contentType) {
    axiosInstance.defaults.headers.common["Content-Type"] = contentType;
  } else {
    delete axiosInstance.defaults.headers.common["Content-Type"];
  }
};