import axios from 'axios';
import { getToken } from './authService';

const API = 'http://localhost:8080/api/products';

const axiosAuth = axios.create();
axiosAuth.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export const getProductos = () => axiosAuth.get(API).then(res => res.data);
export const getProductosByCategoria = (cat) =>
  axiosAuth.get(`${API}?category=${encodeURIComponent(cat)}`).then(res => res.data);

export const createProducto = (p) => axiosAuth.post(API, p).then(res => res.data);
export const updateProducto = (id, p) => axiosAuth.put(`${API}/${id}`, p).then(res => res.data);
export const deleteProducto = (id) => axiosAuth.delete(`${API}/${id}`);