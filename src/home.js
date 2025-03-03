//Логіка сторінки Home
import { refs } from './js/refs';
import {
  onCategoryButtonClick,
  onDOMContentLoaded,
  onLoadMoreButtonClick,
} from './js/handlers';

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
refs.categoriesList.addEventListener('click', onCategoryButtonClick);
refs.loadMoreButton.addEventListener('click', onLoadMoreButtonClick);
