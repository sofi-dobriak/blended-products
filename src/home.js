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
} from './js/handlers';

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
});
