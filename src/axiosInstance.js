// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true, // Always send credentials (cookies, authorization headers)
});

export default axiosInstance;
