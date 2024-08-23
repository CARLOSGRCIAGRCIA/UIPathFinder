import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMaps = () => api.get('/maps');
export const getProfile = () => api.get('/users/profile');
export const findOptimalRoute = (id) => api.get(`/routes/${id}`);
export const findOptimalRouteDiagonal = (id) => api.get(`/routes/${id}/diagonal`);
export const getMapById = (id) => api.get(`/maps/${id}`);
export const createMap = (mapData) => api.post('/maps', mapData);

export default api;