import"./assets/styles-BkpBnuOc.js";import{a as l,i as g}from"./assets/vendor-Cbhu4xvy.js";const s={searchForm:document.querySelector(".search-form"),searchBtnClear:document.querySelector(".js-btn-clear"),categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),loadMoreButton:document.querySelector(".js-load-more-button"),notFoundDiv:document.querySelector(".not-found"),modalWindow:document.querySelector(".js-modal-window"),modalBackdrop:document.querySelector(".js-modal-backdrop"),closeButton:document.querySelector(".js-modal-close-button"),modalProductContainer:document.querySelector(".js-modal-product"),dataWishlistCount:document.querySelector("[data-wishlist-count]"),dataCardCount:document.querySelector("[data-cart-count]")},u={WISH_LIST_STORAGE_KEY:"wishlist",CARD_LIST_STORAGE_KEY:"cart"},n={category:null,currentPage:1,totalProducts:null,productsPerPage:12,searchQuery:null};l.defaults.baseURL="https://dummyjson.com/products/";async function v(){return(await l.get("category-list")).data}async function f(){const e=`?limit=12&skip=${(n.currentPage-1)*n.productsPerPage}`,o=await l.get(e);return n.totalProducts=o.data.total,o.data.products}async function L(t){const e=(n.currentPage-1)*n.productsPerPage,o=`category/${t}?limit=12&skip=${e}`,r=await l.get(o);return n.totalProducts=r.data.total,r.data.products}async function E(t){const e=`${t}`;return(await l.get(e)).data}async function k(t){const e=`search?q=${t}`;return(await l.get(e)).data.products}function I(t){t.unshift("all");const e=t.map(o=>`<li class="categories__item">
            <button class="categories__btn" type="button">${o}</button>
        </li>`).join("");s.categoriesList.innerHTML=e}function T(t){const e=t.map(({id:o,thumbnail:r,title:c,brand:a,category:i,price:d})=>`
    <li class="products__item" data-id="${o}">
       <img class="products__image" src="${r}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${a}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");s.productsList.insertAdjacentHTML("beforeend",e)}function C(t){const e=t.map(({id:o,thumbnail:r,title:c,brand:a,category:i,price:d})=>`
    <li class="products__item" data-id="${o}">
       <img class="products__image" src="${r}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${a}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");s.productsList.innerHTML=e}function A(t){const e=t.map(({id:o,thumbnail:r,title:c,brand:a,category:i,price:d})=>`
    <li class="products__item" data-id="${o}">
       <img class="products__image" src="${r}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${a}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");s.productsList.insertAdjacentHTML("beforeend",e)}function q(t){const{id:e,thumbnail:o,title:r,tags:c,description:a,shippingInformation:i,returnPolicy:d,price:w}=t;return`
    <img class="modal-product__img" src="${o}" alt="${r}"/>
      <div class="modal-product__content" data-id="${e}">
        <p class="modal-product__title">${r}</p>
         <ul class="modal-product__tags">
          ${c.map(B=>`<li>${B}</li>`).join("")}
        </ul>
        <p class="modal-product__description">${a}</p>
        <p class="modal-product__shipping-information">Shipping: ${i}</p>
        <p class="modal-product__return-policy">Return Policy: ${d}</p>
        <p class="modal-product__price">Price: ${w}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`}function R(t){return t.map(({id:o,thumbnail:r,title:c,brand:a,category:i,price:d})=>`
    <li class="products__item" data-id="${o}">
       <img class="products__image" src="${r}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${a}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("")}function j(t){const e=document.querySelector(".categories__btn--active");e&&e!==t.target&&e.classList.remove("categories__btn--active"),t.target.classList.add("categories__btn--active")}function P(){s.notFoundDiv.classList.add("not-found--visible")}function $(){s.notFoundDiv.classList.remove("not-found--visible")}function y(){s.loadMoreButton.classList.remove("hide")}function m(){s.loadMoreButton.classList.add("hide")}function b(t,e){const o=JSON.stringify(e);localStorage.setItem(t,o)}function p(t){const e=localStorage.getItem(t);try{const o=JSON.parse(e);return Array.isArray(o)?o:[]}catch{return[]}}function D(){s.modalBackdrop.classList.add("modal--is-open"),s.closeButton.addEventListener("click",_),s.modalBackdrop.addEventListener("click",_),K(),N()}function _(t){t&&(t.target===s.modalBackdrop||t.target===s.closeButton)&&(s.modalBackdrop.classList.remove("modal--is-open"),s.closeButton.removeEventListener("click",_),s.modalBackdrop.removeEventListener("click",_))}async function M(){h(),S();try{const t=await v();I(t);const e=await f();T(e),y()}catch(t){console.log(t)}}async function O(t){if(n.currentPage=1,n.totalProducts=0,!t.target.classList.contains("categories__btn"))return;const e=t.target.textContent.trim().toLowerCase();n.category=e,j(t);try{let o=[];e==="all"?o=await f():o=await L(e),o.length===0&&(m(),P()),C(o),$(),n.totalProducts>n.productsPerPage?y():m()}catch(o){console.log(o)}}async function W(){let t=[],e=0;n.currentPage+=1;try{n.category==="all"||!n.category?(t=await f(),e=n.totalProducts):(t=await L(n.category),e=n.totalProducts),A(t),n.currentPage*n.productsPerPage>=e?(m(),g.info({message:"No more products to load"})):y()}catch(o){console.log(o)}}async function x(t){t.preventDefault();const e=t.target.elements.searchValue,o=e.value.trim();if(o){n.searchQuery=o;try{const r=await k(o),c=R(r);s.productsList.innerHTML=c,e.value="",c?$():P(),m()}catch(r){g.error({message:"Something went wrong. Please, try later"}),console.log("Error in onSearchFormSubmit:",r)}}}async function F(t){const e=t.target.closest(".products__item");if(!e)return;const o=e.dataset.id;try{const r=await E(o),c=q(r);s.modalProductContainer.innerHTML=c,D()}catch(r){g.error({message:"Something went to wrong. Please, try later"}),console.log(r)}}async function G(t){const o=t.target.closest(".search-form").elements.searchValue;o.value="";try{const r=await f();C(r)}catch(r){g.error({message:"Something went wrong. Please, try later"}),console.log("Error in onSearchFormSubmit:",r)}}function H(){const t=document.querySelector(".modal-product__content");if(!t)return;const e=t.dataset.id;let o=p(u.WISH_LIST_STORAGE_KEY);const r=o.indexOf(e),c=document.querySelector(".js-wishlist-button");c&&(r===-1?(o.push(e),c.textContent="Remove from wishlist"):(o.splice(r,1),c.textContent="Add to wishlist"),b(u.WISH_LIST_STORAGE_KEY,o),h())}function K(){const t=document.querySelector(".modal-product__content");if(!t)return;const e=t.dataset.id;let o=p(u.WISH_LIST_STORAGE_KEY);const r=document.querySelector(".js-wishlist-button");r&&(r.textContent=o.includes(e)?"Remove from Wishlist":"Add to Wishlist",h())}function h(){const t=p(u.WISH_LIST_STORAGE_KEY);s.dataWishlistCount?s.dataWishlistCount.textContent=t.length:console.error("refs.dataWishlistCount is not defined")}function Y(){const t=document.querySelector(".modal-product__content");if(!t)return;const e=t.dataset.id;let o=p(u.CARD_LIST_STORAGE_KEY);const r=o.indexOf(e),c=document.querySelector(".js-card-button");c&&(r===-1?(o.push(e),c.textContent="Remove from cart"):(o.splice(r,1),c.textContent="Add to cart"),b(u.CARD_LIST_STORAGE_KEY,o),S())}function N(){const t=document.querySelector(".modal-product__content");if(!t)return;const e=t.dataset.id;let o=p(u.CARD_LIST_STORAGE_KEY);const r=document.querySelector(".js-card-button");r&&(r.textContent=o.includes(e)?"Remove from cart":"Add to cart",S())}function S(){const t=p(u.CARD_LIST_STORAGE_KEY);s.dataCardCount?s.dataCardCount.textContent=t.length:console.error("refs.dataCardCount is not defined")}document.addEventListener("DOMContentLoaded",M);s.categoriesList.addEventListener("click",O);s.productsList.addEventListener("click",F);s.loadMoreButton.addEventListener("click",W);s.searchForm.addEventListener("submit",x);s.searchBtnClear.addEventListener("click",G);s.modalWindow.addEventListener("click",t=>{t.target.classList.contains("js-wishlist-button")&&H(),t.target.classList.contains("js-card-button")&&Y()});
//# sourceMappingURL=index.js.map
