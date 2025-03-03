//Логіка сторінки Home
import { refs } from './js/refs';
import {
  onCategoryButtonClick,
  onDOMContentLoaded,
  onLoadMoreButtonClick,
  onProductItemClick,
  onSearchFormSubmit,
} from './js/handlers';

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
refs.categoriesList.addEventListener('click', onCategoryButtonClick);
refs.productsList.addEventListener('click', onProductItemClick);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
refs.searchForm.addEventListener('submit', onSearchFormSubmit);
