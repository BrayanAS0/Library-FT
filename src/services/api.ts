import axios from "axios";

const main_Url = "http://127.0.0.1:8000/";

const apiInstance = axios.create({
  baseURL: main_Url,
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        try {
          const { data } = await apiInstance.post("api/token/refresh/", { refresh });
          localStorage.setItem("access", data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return apiInstance(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        }
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);


const Api = {
  async get(url: string) {
    const response = await apiInstance.get(url);
    return response.data;
  },
  async post(url: string, params: any) {
    const response = await apiInstance.post(url, params);
    return response.data;
  },
};

export default Api;
