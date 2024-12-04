import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchProducts = () => API.get('/products');
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const addToCart = (product) => API.post('/cart', product);
export const fetchCart = () => API.get('/cart');

export default API;
