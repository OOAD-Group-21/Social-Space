import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export default axiosInstance;
