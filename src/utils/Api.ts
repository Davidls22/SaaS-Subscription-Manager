import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export const getSubscriptions = () => API.get('/subscriptions');
export const addSubscription = (data: any) => API.post('/subscriptions', data);
export const updateSubscription = (id: string, data: any) => API.put(`/subscriptions/${id}`, data);
export const deleteSubscription = (id: string) => API.delete(`/subscriptions/${id}`);