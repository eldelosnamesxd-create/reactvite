import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://apis-cyan-six.vercel.app/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;