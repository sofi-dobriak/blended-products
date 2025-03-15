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
  renderOneCard,
} from './render-function';

import {
  setStatusButtons,
  showNotFoundMessage,
  showLoadMoreButton,
  hideLoadMoreButton,
  hideNotFoundMessage,
} from './helpers';

import { saveToLS, loadFromLS, saveToSS, loadFromSS } from './storage';
import { state, STORAGE_KEYS } from './constants';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs } from './refs';
import { openModal } from './modal';

export async function onDOMContentLoaded() {
  updateWishlistCount();
  updateCardCount();
  backToTop();

  const searchQuery = loadFromSS(STORAGE_KEYS.USER_VALUE_SESSION_STORAGE_KEY);

  try {
    const categories = await getProductsCategories();
    renderCategoriesList(categories);

    if (!searchQuery) {
      const products = await getProducts();
      renderProductsList(products);

      showLoadMoreButton();
    } else {
      perFormSearch(searchQuery);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function onDOMContentLoadedWishList() {
  updateWishlistCount();
  updateCardCount();
  backToTop();

  let wishlist = loadFromLS(STORAGE_KEYS.WISH_LIST_STORAGE_KEY) || [];

  try {
    const response = wishlist.map(id => getProductByID(id));

    const products = await Promise.all(response);
    renderProductsList(products);
  } catch (error) {
    console.log(error);
  }
}

export async function onDOMContentLoadedCardList() {
  updateWishlistCount();
  updateCardCount();
  updateCardTotalItems();
  updateCardTotalPrice();
  backToTop();

  let cardList = loadFromLS(STORAGE_KEYS.CARD_LIST_STORAGE_KEY) || [];

  try {
    const response = cardList.map(id => getProductByID(id));

    const products = await Promise.all(response);
    renderProductsList(products);
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
    saveToSS(STORAGE_KEYS.USER_VALUE_SESSION_STORAGE_KEY, userValue);
    window.location.href = './index.html';
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please, try later',
    });
    console.log('Error in onSearchFormSubmit:', error);
  }
}

export async function perFormSearch(query) {
  try {
    const products = await getProductByUserValue(query);
    const markup = renderSearchProducts(products);

    refs.productsList.innerHTML = '';
    refs.productsList.innerHTML = markup;

    if (!markup) {
      showNotFoundMessage();
    } else {
      hideNotFoundMessage();
    }

    hideLoadMoreButton();
    sessionStorage.removeItem(STORAGE_KEYS.USER_VALUE_SESSION_STORAGE_KEY);
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please, try later',
    });
    console.log('Error during search:', error);
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
    window.location.href = './index.html';

    const products = await getProducts();
    renderProductsListByCategory(products);

    hideNotFoundMessage();
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

  const wishListButton = document.querySelector(`.js-wishlist-button`);
  if (!wishListButton) return;

  const isWishlistPage = window.location.pathname.includes('/wishlist');
  const productsIndex = wishlist.indexOf(productID);

  if (productsIndex === -1) {
    wishlist.push(productID);
    wishListButton.textContent = 'Remove from wishlist';

    if (isWishlistPage) {
      addProductToList(productID);
    }
  } else {
    wishlist.splice(productsIndex, 1);
    wishListButton.textContent = 'Add to wishlist';

    if (isWishlistPage) {
      removeProductFromListPage(productID);
    }
  }

  saveToLS(STORAGE_KEYS.WISH_LIST_STORAGE_KEY, wishlist);
  updateWishlistCount();
}

function removeProductFromListPage(productID) {
  const productCard = document.querySelector(
    `.products__item[data-id="${productID}"]`
  );
  if (productCard) {
    productCard.remove();
  }
}

export async function addProductToList(productID) {
  const modalProductContent = document.querySelector('.modal-product__content');
  if (!modalProductContent) return;

  try {
    const product = await getProductByID(productID);

    if (!product) {
      console.error('Product not found');
      return;
    }

    const markup = renderOneCard(product);

    if (refs && refs.productsList) {
      refs.productsList.insertAdjacentHTML('afterbegin', markup);
    } else {
      console.error('Products list container not found');
    }
  } catch (error) {
    console.log(error);
  }
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
  let cardList = loadFromLS(STORAGE_KEYS.CARD_LIST_STORAGE_KEY);

  const cardButton = document.querySelector(`.js-card-button`);
  if (!cardButton) return;

  const isCardPage = window.location.pathname.includes('/cart');
  const productsIndex = cardList.indexOf(productID);

  if (productsIndex === -1) {
    cardList.push(productID);
    cardButton.textContent = 'Remove from cart';

    if (isCardPage) {
      addProductToList(productID);
    }
  } else {
    cardList.splice(productsIndex, 1);
    cardButton.textContent = 'Add to cart';

    if (isCardPage) {
      removeProductFromListPage(productID);
    }
  }

  saveToLS(STORAGE_KEYS.CARD_LIST_STORAGE_KEY, cardList);
  updateCardCount();
  updateCardTotalItems();
  updateCardTotalPrice();
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

function updateCardTotalItems() {
  const card = loadFromLS(STORAGE_KEYS.CARD_LIST_STORAGE_KEY);

  if (refs.cardTotalItems) {
    refs.cardTotalItems.textContent = card.length;
  } else {
    console.error('refs.cardTotalItems is not defined');
  }
}

async function updateCardTotalPrice() {
  const cardIDList = loadFromLS(STORAGE_KEYS.CARD_LIST_STORAGE_KEY);

  try {
    const response = cardIDList.map(id => getProductByID(id));
    const productsArray = await Promise.all(response);

    const totalPrice = productsArray.reduce((sum, product) => {
      if (product.price) {
        return (sum += product.price);
      }
      return sum;
    }, 0);

    const totalPriceText = refs.cardTotalPrice;
    totalPriceText.textContent = `$${totalPrice.toFixed(2)}`;
  } catch (error) {
    console.log(error);
  }
}

export function onBuyProductsButton() {
  iziToast.success({
    message: 'Success',
  });
}

function backToTop() {
  const scrollToTopButton = document.querySelector('.js-back-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      scrollToTopButton.classList.add('show');
    } else {
      scrollToTopButton.classList.remove('show');
    }
  });

  scrollToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
