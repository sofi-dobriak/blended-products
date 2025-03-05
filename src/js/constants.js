//Константи

import { saveToLS } from './helpers';

export const STORAGE_KEYS = {
  WISH_LIST_STORAGE_KEY: 'wishlist',
};

export const state = {
  category: null,
  currentPage: 1,
  totalProducts: null,
  productsPerPage: 12,
  searchQuery: null,
};
