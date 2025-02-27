// Функції для роботи з бекендом

import axios from 'axios';
import { currentPage } from './constants';

axios.defaults.baseURL = 'https://dummyjson.com/products/';

export async function getProductsCategories() {
  const END_POINT = 'category-list';
  const url = `${END_POINT}`;

  const response = await axios.get(url);

  return response.data;
}

export async function getProducts() {
  const skip = (currentPage - 1) * 12;

  const url = `?limit=12&skip=${skip}`;

  const response = await axios.get(url);

  return response.data.products;
}

export async function getProductsByCategory(category) {
  const END_POINT = 'category';
  const skip = (currentPage - 1) * 12;
  const url = `${END_POINT}/${category}?limit=12&skip=${skip}`;

  const response = await axios.get(url);

  return response.data.products;
}
