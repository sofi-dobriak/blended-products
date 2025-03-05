//Функцію для створення, рендеру або видалення розмітки

import { refs } from './refs';

export function renderCategoriesList(categories) {
  categories.unshift('all');

  const markup = categories
    .map(
      category =>
        `<li class="categories__item">
            <button class="categories__btn" type="button">${category}</button>
        </li>`
    )
    .join('');

  refs.categoriesList.innerHTML = markup;
}

export function renderProductsList(products) {
  const markup = products
    .map(
      ({ id, thumbnail, title, brand, category, price }) => `
    <li class="products__item" data-id="${id}">
       <img class="products__image" src="${thumbnail}" alt="${title}" />
       <p class="products__title">${title}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${brand}</span>
       </p>
       <p class="products__category">Category: ${category}</p>
       <p class="products__price">Price: ${price}$</p>
    </li>`
    )
    .join('');

  refs.productsList.insertAdjacentHTML('beforeend', markup);
}

export function renderProductsListByCategory(products) {
  const markup = products
    .map(
      ({ id, thumbnail, title, brand, category, price }) => `
    <li class="products__item" data-id="${id}">
       <img class="products__image" src="${thumbnail}" alt="${title}" />
       <p class="products__title">${title}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${brand}</span>
       </p>
       <p class="products__category">Category: ${category}</p>
       <p class="products__price">Price: ${price}$</p>
    </li>`
    )
    .join('');

  refs.productsList.innerHTML = markup;
}

export function renderPaginationProducts(products) {
  const markup = products
    .map(
      ({ id, thumbnail, title, brand, category, price }) => `
    <li class="products__item" data-id="${id}">
       <img class="products__image" src="${thumbnail}" alt="${title}" />
       <p class="products__title">${title}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${brand}</span>
       </p>
       <p class="products__category">Category: ${category}</p>
       <p class="products__price">Price: ${price}$</p>
    </li>`
    )
    .join('');

  refs.productsList.insertAdjacentHTML('beforeend', markup);
}

export function renderModalProduct(product) {
  const {
    id,
    thumbnail,
    title,
    tags,
    description,
    shippingInformation,
    returnPolicy,
    price,
  } = product;

  return `
    <img class="modal-product__img" src="${thumbnail}" alt="${title}"/>
      <div class="modal-product__content" data-id="${id}">
        <p class="modal-product__title">${title}</p>
         <ul class="modal-product__tags">
          ${tags.map(tag => `<li>${tag}</li>`).join('')}
        </ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`;
}

export function renderSearchProducts(products) {
  const markup = products
    .map(
      ({ id, thumbnail, title, brand, category, price }) => `
    <li class="products__item" data-id="${id}">
       <img class="products__image" src="${thumbnail}" alt="${title}" />
       <p class="products__title">${title}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${brand}</span>
       </p>
       <p class="products__category">Category: ${category}</p>
       <p class="products__price">Price: ${price}$</p>
    </li>`
    )
    .join('');

  return markup;
}
