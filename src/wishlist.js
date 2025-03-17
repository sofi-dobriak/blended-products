//Логіка сторінки Wishlist

import { refs } from './js/refs';
import {
  onBuyProductsButton,
  onCardButtonClick,
  onClearButtonClick,
  onDOMContentLoadedWishList,
  onProductItemClick,
  onSearchFormSubmit,
  onWishListButtonClick,
} from './js/handlers';

document.addEventListener('DOMContentLoaded', onDOMContentLoadedWishList);
refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.searchBtnClear.addEventListener('click', onClearButtonClick);
refs.productsList.addEventListener('click', onProductItemClick);
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

  if (e.target.classList.contains('js-buy-products')) {
    onBuyProductsButton();
  }
});
