import"./assets/styles-BkpBnuOc.js";import{a as u,i as m}from"./assets/vendor-Cbhu4xvy.js";const e={searchForm:document.querySelector(".search-form"),categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),loadMoreButton:document.querySelector(".js-load-more-button"),notFoundDiv:document.querySelector(".not-found"),modalWindow:document.querySelector(".js-modal-window"),modalBackdrop:document.querySelector(".js-modal-backdrop"),closeButton:document.querySelector(".js-modal-close-button"),modalProductContainer:document.querySelector(".js-modal-product")},c={category:null,currentPage:null,totalProducts:null,productsPerPage:12,searchQuery:null};u.defaults.baseURL="https://dummyjson.com/products/";async function $(){return(await u.get("category-list")).data}async function g(){const o=`?limit=12&skip=${(c.currentPage-1)*c.productsPerPage}`,r=await u.get(o);return c.totalProducts=r.data.total,r.data.products}async function y(t){const o=(c.currentPage-1)*c.productsPerPage,r=`category/${t}?limit=12&skip=${o}`,s=await u.get(r);return c.totalProducts=s.data.total,s.data.products}async function f(t){const o=`${t}`;return(await u.get(o)).data}async function L(t){const o=`search?q=${t}`;return(await u.get(o)).data.products}function b(t){t.unshift("all");const o=t.map(r=>`<li class="categories__item">
            <button class="categories__btn" type="button">${r}</button>
        </li>`).join("");e.categoriesList.innerHTML=o}function k(t){const o=t.map(({id:r,thumbnail:s,title:a,brand:n,category:d,price:i})=>`
    <li class="products__item" data-id="${r}">
       <img class="products__image" src="${s}" alt="${a}" />
       <p class="products__title">${a}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${d}</p>
       <p class="products__price">Price: ${i}$</p>
    </li>`).join("");e.productsList.insertAdjacentHTML("beforeend",o)}function h(t){const o=t.map(({id:r,thumbnail:s,title:a,brand:n,category:d,price:i})=>`
    <li class="products__item" data-id="${r}">
       <img class="products__image" src="${s}" alt="${a}" />
       <p class="products__title">${a}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${d}</p>
       <p class="products__price">Price: ${i}$</p>
    </li>`).join("");e.productsList.innerHTML=o}function B(t){const o=t.map(({id:r,thumbnail:s,title:a,brand:n,category:d,price:i})=>`
    <li class="products__item" data-id="${r}">
       <img class="products__image" src="${s}" alt="${a}" />
       <p class="products__title">${a}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${d}</p>
       <p class="products__price">Price: ${i}$</p>
    </li>`).join("");e.productsList.insertAdjacentHTML("beforeend",o)}function v(t){const{thumbnail:o,title:r,tags:s,description:a,shippingInformation:n,returnPolicy:d,price:i}=t;return`
  <img class="modal-product__img" src="${o}" alt="${r}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${r}</p>
       <ul class="modal-product__tags">
        ${s.map(P=>`<li>${P}</li>`).join("")}
      </ul>
      <p class="modal-product__description">${a}</p>
      <p class="modal-product__shipping-information">Shipping: ${n}</p>
      <p class="modal-product__return-policy">Return Policy: ${d}</p>
      <p class="modal-product__price">Price: ${i}$</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>`}function w(t){return t.map(({id:r,thumbnail:s,title:a,brand:n,category:d,price:i})=>`
    <li class="products__item" data-id="${r}">
       <img class="products__image" src="${s}" alt="${a}" />
       <p class="products__title">${a}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${d}</p>
       <p class="products__price">Price: ${i}$</p>
    </li>`).join("")}function M(t){const o=document.querySelector(".categories__btn--active");o&&o!==t.target&&o.classList.remove("categories__btn--active"),t.target.classList.add("categories__btn--active")}function S(){e.notFoundDiv.classList.add("not-found--visible")}function _(){e.loadMoreButton.classList.remove("hide")}function l(){e.loadMoreButton.classList.add("hide")}function C(){e.modalBackdrop.classList.add("modal--is-open"),e.closeButton.addEventListener("click",p),e.modalBackdrop.addEventListener("click",p)}function p(t){t&&(t.target===e.modalBackdrop||t.target===e.closeButton)&&(e.modalBackdrop.classList.remove("modal--is-open"),e.closeButton.removeEventListener("click",p),e.modalBackdrop.removeEventListener("click",p))}async function j(){try{const t=await $();b(t);const o=await g();k(o),_()}catch(t){console.log(t)}}async function E(t){if(c.currentPage=1,c.totalProducts=0,!t.target.classList.contains("categories__btn"))return;const o=t.target.textContent.trim().toLowerCase();c.category=o,M(t);try{let r=[];o==="all"?r=await g():r=await y(o),r.length===0&&(l(),S()),h(r),c.totalProducts>c.productsPerPage?_():l()}catch(r){console.log(r)}}async function q(){let t=[],o=0;c.currentPage+=1;try{c.category==="all"||!c.category?(t=await g(),o=c.totalProducts):(t=await y(c.category),o=c.totalProducts),B(t),c.currentPage*c.productsPerPage>=o?(l(),m.info({message:"No more products to load"})):_()}catch(r){console.log(r)}}async function T(t){t.preventDefault();const o=t.target.elements.searchValue,r=o.value.trim();if(r){c.searchQuery=r;try{const s=await L(r),a=w(s);e.productsList.innerHTML=a,o.value="",l()}catch(s){m.error({message:"Something went wrong. Please, try later"}),console.log("Error in onSearchFormSubmit:",s)}}}async function D(t){const o=t.target.closest(".products__item");if(!o)return;const r=o.dataset.id;try{const s=await f(r),a=v(s);e.modalProductContainer.innerHTML=a,C()}catch(s){m.error({message:"Something went to wrong. Please, try later"}),console.log(s)}}document.addEventListener("DOMContentLoaded",j);e.categoriesList.addEventListener("click",E);e.productsList.addEventListener("click",D);e.loadMoreButton.addEventListener("click",q);e.searchForm.addEventListener("submit",T);
//# sourceMappingURL=index.js.map
