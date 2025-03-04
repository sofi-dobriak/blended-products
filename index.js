import"./assets/styles-BkpBnuOc.js";import{a as u,i as m}from"./assets/vendor-Cbhu4xvy.js";const s={searchForm:document.querySelector(".search-form"),searchBtnClear:document.querySelector(".js-btn-clear"),categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),loadMoreButton:document.querySelector(".js-load-more-button"),notFoundDiv:document.querySelector(".not-found"),modalWindow:document.querySelector(".js-modal-window"),modalBackdrop:document.querySelector(".js-modal-backdrop"),closeButton:document.querySelector(".js-modal-close-button"),modalProductContainer:document.querySelector(".js-modal-product")},c={category:null,currentPage:1,totalProducts:null,productsPerPage:12,searchQuery:null};u.defaults.baseURL="https://dummyjson.com/products/";async function h(){return(await u.get("category-list")).data}async function g(){const o=`?limit=12&skip=${(c.currentPage-1)*c.productsPerPage}`,e=await u.get(o);return c.totalProducts=e.data.total,e.data.products}async function y(t){const o=(c.currentPage-1)*c.productsPerPage,e=`category/${t}?limit=12&skip=${o}`,r=await u.get(e);return c.totalProducts=r.data.total,r.data.products}async function b(t){const o=`${t}`;return(await u.get(o)).data}async function k(t){const o=`search?q=${t}`;return(await u.get(o)).data.products}function B(t){t.unshift("all");const o=t.map(e=>`<li class="categories__item">
            <button class="categories__btn" type="button">${e}</button>
        </li>`).join("");s.categoriesList.innerHTML=o}function v(t){const o=t.map(({id:e,thumbnail:r,title:a,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${e}">
       <img class="products__image" src="${r}" alt="${a}" />
       <p class="products__title">${a}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");s.productsList.insertAdjacentHTML("beforeend",o)}function f(t){const o=t.map(({id:e,thumbnail:r,title:a,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${e}">
       <img class="products__image" src="${r}" alt="${a}" />
       <p class="products__title">${a}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");s.productsList.innerHTML=o}function w(t){const o=t.map(({id:e,thumbnail:r,title:a,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${e}">
       <img class="products__image" src="${r}" alt="${a}" />
       <p class="products__title">${a}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");s.productsList.insertAdjacentHTML("beforeend",o)}function S(t){const{thumbnail:o,title:e,tags:r,description:a,shippingInformation:n,returnPolicy:i,price:d}=t;return`
  <img class="modal-product__img" src="${o}" alt="${e}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${e}</p>
       <ul class="modal-product__tags">
        ${r.map(L=>`<li>${L}</li>`).join("")}
      </ul>
      <p class="modal-product__description">${a}</p>
      <p class="modal-product__shipping-information">Shipping: ${n}</p>
      <p class="modal-product__return-policy">Return Policy: ${i}</p>
      <p class="modal-product__price">Price: ${d}$</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>`}function C(t){return t.map(({id:e,thumbnail:r,title:a,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${e}">
       <img class="products__image" src="${r}" alt="${a}" />
       <p class="products__title">${a}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("")}function M(t){const o=document.querySelector(".categories__btn--active");o&&o!==t.target&&o.classList.remove("categories__btn--active"),t.target.classList.add("categories__btn--active")}function P(){s.notFoundDiv.classList.add("not-found--visible")}function $(){s.notFoundDiv.classList.remove("not-found--visible")}function _(){s.loadMoreButton.classList.remove("hide")}function l(){s.loadMoreButton.classList.add("hide")}function j(){s.modalBackdrop.classList.add("modal--is-open"),s.closeButton.addEventListener("click",p),s.modalBackdrop.addEventListener("click",p)}function p(t){t&&(t.target===s.modalBackdrop||t.target===s.closeButton)&&(s.modalBackdrop.classList.remove("modal--is-open"),s.closeButton.removeEventListener("click",p),s.modalBackdrop.removeEventListener("click",p))}async function E(){try{const t=await h();B(t);const o=await g();v(o),_()}catch(t){console.log(t)}}async function q(t){if(c.currentPage=1,c.totalProducts=0,!t.target.classList.contains("categories__btn"))return;const o=t.target.textContent.trim().toLowerCase();c.category=o,M(t);try{let e=[];o==="all"?e=await g():e=await y(o),e.length===0&&(l(),P()),f(e),$(),c.totalProducts>c.productsPerPage?_():l()}catch(e){console.log(e)}}async function F(){let t=[],o=0;c.currentPage+=1;try{c.category==="all"||!c.category?(t=await g(),o=c.totalProducts):(t=await y(c.category),o=c.totalProducts),w(t),c.currentPage*c.productsPerPage>=o?(l(),m.info({message:"No more products to load"})):_()}catch(e){console.log(e)}}async function D(t){t.preventDefault();const o=t.target.elements.searchValue,e=o.value.trim();if(e){c.searchQuery=e;try{const r=await k(e),a=C(r);s.productsList.innerHTML=a,o.value="",a?$():P(),l()}catch(r){m.error({message:"Something went wrong. Please, try later"}),console.log("Error in onSearchFormSubmit:",r)}}}async function T(t){const o=t.target.closest(".products__item");if(!o)return;const e=o.dataset.id;try{const r=await b(e),a=S(r);s.modalProductContainer.innerHTML=a,j()}catch(r){m.error({message:"Something went to wrong. Please, try later"}),console.log(r)}}async function I(t){const e=t.target.closest(".search-form").elements.searchValue;e.value="";try{const r=await g();f(r)}catch(r){m.error({message:"Something went wrong. Please, try later"}),console.log("Error in onSearchFormSubmit:",r)}}document.addEventListener("DOMContentLoaded",E);s.categoriesList.addEventListener("click",q);s.productsList.addEventListener("click",T);s.loadMoreButton.addEventListener("click",F);s.searchForm.addEventListener("submit",D);s.searchBtnClear.addEventListener("click",I);
//# sourceMappingURL=index.js.map
