// Функції, які передаються колбеками в addEventListners

import {
  getProducts,
  getProductsCategories,
  getProductsByCategory,
} from './products-api';
import {
  renderCategoriesList,
  renderProductsList,
  renderProductsListByCategory,
  renderPaginationProducts,
} from './render-function';

import {
  setStatusButtons,
  showNotFoundMessage,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './helpers';
import { state } from './constants';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export async function onDOMContentLoaded() {
  try {
    const categories = await getProductsCategories();
    renderCategoriesList(categories);

    const products = await getProducts();
    renderProductsList(products);

    showLoadMoreButton();
  } catch (error) {
    console.log(error);
  }
}

export async function onCategoryButtonClick(e) {
  state.currentPage = 1;
  state.totalProducts = 0;

  if (!e.target.classList.contains('categories__btn')) return;

  const categoryTitle = e.target.textContent.trim().toLowerCase();
  state.category = categoryTitle;

  setStatusButtons(e);

  try {
    let markup = [];

    if (categoryTitle === 'all') {
      markup = await getProducts();
    } else {
      markup = await getProductsByCategory(categoryTitle);
    }

    if (markup.length === 0) {
      hideLoadMoreButton();
      showNotFoundMessage();
    }

    renderProductsListByCategory(markup);

    if (state.totalProducts > state.productsPerPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function onLoadMoreButtonClick(e) {
  e.preventDefault();

  state.currentPage += 1;

  try {
    let products = [];

    if (!state.category) {
      products = await getProducts();
    } else {
      products = await getProductsByCategory(state.category);
    }

    renderPaginationProducts(products);

    if (state.currentPage * state.productsPerPage >= state.totalProducts) {
      hideLoadMoreButton();
      iziToast.info({
        message: 'No more products to load',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went to wrong. Please, try later',
    });
    console.log(error);
  }
}
