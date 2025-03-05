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
  saveToLS,
  loadFromLS,
} from './helpers';
import { state, STORAGE_KEYS } from './constants';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs } from './refs';
import { openModal } from './modal';

export async function onDOMContentLoaded() {
  updateWishlistCount();
  updateCardCount();

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

export function onWishListButtonClick() {
  const modalProductContent = document.querySelector('.modal-product__content');
  if (!modalProductContent) return;

  const productID = modalProductContent.dataset.id;
  let wishlist = loadFromLS(STORAGE_KEYS.WISH_LIST_STORAGE_KEY);

  const productsIndex = wishlist.indexOf(productID);

  const wishListButton = document.querySelector(`.js-wishlist-button`);
  if (!wishListButton) return;

  if (productsIndex === -1) {
    wishlist.push(productID);
    wishListButton.textContent = 'Remove from wishlist';
  } else {
    wishlist.splice(productsIndex, 1);
    wishListButton.textContent = 'Add to wishlist';
  }

  saveToLS(STORAGE_KEYS.WISH_LIST_STORAGE_KEY, wishlist);
  updateWishlistCount();
}

export function updateWishList() {
  const modalProductContent = document.querySelector('.modal-product__content');
  if (!modalProductContent) return;

  const productID = modalProductContent.dataset.id;
  let wishlist = loadFromLS(STORAGE_KEYS.WISH_LIST_STORAGE_KEY);

  const wishListButton = document.querySelector(`.js-wishlist-button`);
  if (!wishListButton) return;

  wishListButton.textContent = wishlist.includes(productID)
    ? 'Remove from Wishlist'
    : 'Add to Wishlist';

  updateWishlistCount();
}

function updateWishlistCount() {
  const wishlist = loadFromLS(STORAGE_KEYS.WISH_LIST_STORAGE_KEY);

  if (refs.dataWishlistCount) {
    refs.dataWishlistCount.textContent = wishlist.length;
  } else {
    console.error('refs.dataWishlistCount is not defined');
  }
}

export function onCardButtonClick() {
  const modalProductContent = document.querySelector('.modal-product__content');
  if (!modalProductContent) return;

  const productID = modalProductContent.dataset.id;
  let card = loadFromLS(STORAGE_KEYS.CARD_LIST_STORAGE_KEY);

  const productsIndex = card.indexOf(productID);

  const cardButton = document.querySelector(`.js-card-button`);
  if (!cardButton) return;

  if (productsIndex === -1) {
    card.push(productID);
    cardButton.textContent = 'Remove from cart';
  } else {
    card.splice(productsIndex, 1);
    cardButton.textContent = 'Add to cart';
  }

  saveToLS(STORAGE_KEYS.CARD_LIST_STORAGE_KEY, card);
  updateCardCount();
}

export function updateCardList() {
  const modalProductContent = document.querySelector('.modal-product__content');
  if (!modalProductContent) return;

  const productID = modalProductContent.dataset.id;
  let card = loadFromLS(STORAGE_KEYS.CARD_LIST_STORAGE_KEY);

  const cardButton = document.querySelector(`.js-card-button`);
  if (!cardButton) return;

  cardButton.textContent = card.includes(productID)
    ? 'Remove from cart'
    : 'Add to cart';

  updateCardCount();
}

function updateCardCount() {
  const card = loadFromLS(STORAGE_KEYS.CARD_LIST_STORAGE_KEY);

  if (refs.dataCardCount) {
    refs.dataCardCount.textContent = card.length;
  } else {
    console.error('refs.dataCardCount is not defined');
  }
}
