// Функції для роботи з бекендом

import axios from 'axios';
import { state } from './constants';

axios.defaults.baseURL = 'https://dummyjson.com/products/';

export async function getProductsCategories() {
  const END_POINT = 'category-list';
  const url = `${END_POINT}`;

  const response = await axios.get(url);

  return response.data;
}

export async function getProducts() {
  const skip = (state.currentPage - 1) * state.productsPerPage;
  const url = `?limit=12&skip=${skip}`;

  const response = await axios.get(url);
  state.totalProducts = response.data.total;

  return response.data.products;
}

export async function getProductsByCategory(category) {
  const skip = (state.currentPage - 1) * 12;
  const url = `category/${category}?limit=12&skip=${skip}`;

  const response = await axios.get(url);
  state.totalProducts = response.data.total;

  return response.data.products;
}
