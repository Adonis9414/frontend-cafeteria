import axios from 'axios';
import { getToken } from './authService';

const API = 'http://localhost:8080/api/categories';

const axiosAuth = axios.create();
axiosAuth.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export const getCategorias = () => axiosAuth.get(API).then(res => res.data);
