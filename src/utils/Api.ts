import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api",
});

API.interceptors.request.use((config:any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getSubscriptions = () => API.get("/subscriptions");
export const addSubscription = (data:any) => API.post("/subscriptions", data);
export const updateSubscription = (id:any, data:any) =>
  API.put(`/subscriptions/${id}`, data);
export const deleteSubscription = (id:any) => API.delete(`/subscriptions/${id}`);