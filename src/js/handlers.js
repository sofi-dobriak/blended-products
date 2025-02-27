// Функції, які передаються колбеками в addEventListners

import { refs } from './refs';
import {
  getProducts,
  getProductsCategories,
  getProductsByCategory,
} from './products-api';
import {
  renderCategoriesList,
  renderProductsList,
  renderProductsListByCategory,
} from './render-function';

import { showNotFoundMessage, hideNotFoundMessage } from './not-found-message';
import { setStatusButtons } from './set-status-buttons';

export async function onDOMContentLoaded() {
  try {
    const categories = await getProductsCategories();
    renderCategoriesList(categories);

    const products = await getProducts();
    renderProductsList(products);

    refs.categoriesList.addEventListener('click', onCategoryButtonClick);
  } catch (error) {
    console.log(error);
  }
}

export async function onCategoryButtonClick(e) {
  if (!e.target.classList.contains('categories__btn')) return;

  const categoryTitle = e.target.textContent.trim().toLowerCase();
  setStatusButtons(e);

  try {
    let markup = [];

    if (categoryTitle === 'all') {
      markup = await getProducts();
    } else {
      markup = await getProductsByCategory(categoryTitle);
    }

    if (markup.length === 0) {
      showNotFoundMessage();
    }

    renderProductsListByCategory(markup);
  } catch (error) {
    console.log(error);
  }
}
