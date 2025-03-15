//Логіка сторінки Cart
import { refs } from './js/refs';
import {
  onCardButtonClick,
  onClearButtonClick,
  onDOMContentLoadedCardList,
  onProductItemClick,
  onSearchFormSubmit,
  onWishListButtonClick,
  onBuyProductsButton,
} from './js/handlers';

document.addEventListener('DOMContentLoaded', onDOMContentLoadedCardList);
refs.productsList.addEventListener('click', onProductItemClick);
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
refs.cardBuyProductsButton.addEventListener('click', onBuyProductsButton);
