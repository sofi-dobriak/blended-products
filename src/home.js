//Логіка сторінки Home
import { refs } from './js/refs';
import {
  onCategoryButtonClick,
  onClearButtonClick,
  onDOMContentLoaded,
  onLoadMoreButtonClick,
  onProductItemClick,
  onSearchFormSubmit,
  onWishListButtonClick,
  onCardButtonClick,
  perFormSearch,
} from './js/handlers';
import { loadFromSS } from './js/storage';
import './js/constants';
import { STORAGE_KEYS } from './js/constants';

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
refs.categoriesList.addEventListener('click', onCategoryButtonClick);
refs.productsList.addEventListener('click', onProductItemClick);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.searchBtnClear.addEventListener('click', onClearButtonClick);
refs.modalWindow.addEventListener('click', e => {
  if (e.target.classList.contains('js-wishlist-button')) {
    onWishListButtonClick();
  }

  if (e.target.classList.contains('js-card-button')) {
    onCardButtonClick();
  }

  if (e.target.classList.contains('modal-product__buy-btn')) {
    onBuyProductsButton();
  }
});

window.addEventListener('load', () => {
  const searchQuery = loadFromSS(STORAGE_KEYS.USER_VALUE_SESSION_STORAGE_KEY);

  if (searchQuery) {
    perFormSearch(searchQuery);
  }
});
