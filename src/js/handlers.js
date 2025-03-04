// Функції, які передаються колбеками в addEventListners

import {
  getProducts,
  getProductsCategories,
  getProductsByCategory,
  getProductByID,
  getProductByUserValue,
} from './products-api';

import {
  renderCategoriesList,
  renderProductsList,
  renderProductsListByCategory,
  renderPaginationProducts,
  renderModalProduct,
  renderSearchProducts,
} from './render-function';

import {
  setStatusButtons,
  showNotFoundMessage,
  showLoadMoreButton,
  hideLoadMoreButton,
  hideNotFoundMessage,
} from './helpers';
import { state } from './constants';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs } from './refs';
import { openModal } from './modal';

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
    hideNotFoundMessage();

    if (state.totalProducts > state.productsPerPage) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function onLoadMoreButtonClick() {
  let products = [];
  let totalProducts = 0;
  state.currentPage += 1;

  try {
    if (state.category === 'all' || !state.category) {
      products = await getProducts();
      totalProducts = state.totalProducts;
    } else {
      products = await getProductsByCategory(state.category);
      totalProducts = state.totalProducts;
    }

    renderPaginationProducts(products);

    if (state.currentPage * state.productsPerPage >= totalProducts) {
      hideLoadMoreButton();
      iziToast.info({
        message: 'No more products to load',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function onSearchFormSubmit(e) {
  e.preventDefault();

  const searchInput = e.target.elements.searchValue;
  const userValue = searchInput.value.trim();

  if (!userValue) return;

  state.searchQuery = userValue;

  try {
    const products = await getProductByUserValue(userValue);
    const markup = renderSearchProducts(products);

    refs.productsList.innerHTML = markup;
    searchInput.value = '';

    if (!markup) {
      showNotFoundMessage();
    } else {
      hideNotFoundMessage();
    }

    hideLoadMoreButton();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please, try later',
    });
    console.log('Error in onSearchFormSubmit:', error);
  }
}

export async function onProductItemClick(e) {
  const productItem = e.target.closest('.products__item');
  if (!productItem) return;

  const cardID = productItem.dataset.id;

  try {
    const product = await getProductByID(cardID);

    const markup = renderModalProduct(product);

    refs.modalProductContainer.innerHTML = markup;

    openModal();
  } catch (error) {
    iziToast.error({
      message: 'Something went to wrong. Please, try later',
    });

    console.log(error);
  }
}

export async function onClearButtonClick(e) {
  const searchForm = e.target.closest('.search-form');
  const searchInput = searchForm.elements.searchValue;

  searchInput.value = '';

  try {
    const products = await getProducts();
    renderProductsListByCategory(products);
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please, try later',
    });
    console.log('Error in onSearchFormSubmit:', error);
  }
}
