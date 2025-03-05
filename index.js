import"./assets/styles-BkpBnuOc.js";import{a as u,i as _}from"./assets/vendor-Cbhu4xvy.js";const r={searchForm:document.querySelector(".search-form"),searchBtnClear:document.querySelector(".js-btn-clear"),categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),loadMoreButton:document.querySelector(".js-load-more-button"),notFoundDiv:document.querySelector(".not-found"),modalWindow:document.querySelector(".js-modal-window"),modalBackdrop:document.querySelector(".js-modal-backdrop"),closeButton:document.querySelector(".js-modal-close-button"),modalProductContainer:document.querySelector(".js-modal-product"),dataWishlistCount:document.querySelector("[data-wishlist-count]")};function k(t){const o=document.querySelector(".categories__btn--active");o&&o!==t.target&&o.classList.remove("categories__btn--active"),t.target.classList.add("categories__btn--active")}function L(){r.notFoundDiv.classList.add("not-found--visible")}function P(){r.notFoundDiv.classList.remove("not-found--visible")}function y(){r.loadMoreButton.classList.remove("hide")}function l(){r.loadMoreButton.classList.add("hide")}function v(t,o){const e=JSON.stringify(o);localStorage.setItem(t,e)}function f(t){const o=localStorage.getItem(t);try{const e=JSON.parse(o);return Array.isArray(e)?e:[]}catch{return[]}}const p={WISH_LIST_STORAGE_KEY:"wishlist"},a={category:null,currentPage:1,totalProducts:null,productsPerPage:12,searchQuery:null};u.defaults.baseURL="https://dummyjson.com/products/";async function B(){return(await u.get("category-list")).data}async function g(){const o=`?limit=12&skip=${(a.currentPage-1)*a.productsPerPage}`,e=await u.get(o);return a.totalProducts=e.data.total,e.data.products}async function S(t){const o=(a.currentPage-1)*a.productsPerPage,e=`category/${t}?limit=12&skip=${o}`,s=await u.get(e);return a.totalProducts=s.data.total,s.data.products}async function C(t){const o=`${t}`;return(await u.get(o)).data}async function E(t){const o=`search?q=${t}`;return(await u.get(o)).data.products}function I(t){t.unshift("all");const o=t.map(e=>`<li class="categories__item">
            <button class="categories__btn" type="button">${e}</button>
        </li>`).join("");r.categoriesList.innerHTML=o}function T(t){const o=t.map(({id:e,thumbnail:s,title:c,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${e}">
       <img class="products__image" src="${s}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");r.productsList.insertAdjacentHTML("beforeend",o)}function $(t){const o=t.map(({id:e,thumbnail:s,title:c,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${e}">
       <img class="products__image" src="${s}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");r.productsList.innerHTML=o}function M(t){const o=t.map(({id:e,thumbnail:s,title:c,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${e}">
       <img class="products__image" src="${s}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");r.productsList.insertAdjacentHTML("beforeend",o)}function j(t){const{id:o,thumbnail:e,title:s,tags:c,description:n,shippingInformation:i,returnPolicy:d,price:b}=t;return`
    <img class="modal-product__img" src="${e}" alt="${s}"/>
      <div class="modal-product__content" data-id="${o}">
        <p class="modal-product__title">${s}</p>
         <ul class="modal-product__tags">
          ${c.map(w=>`<li>${w}</li>`).join("")}
        </ul>
        <p class="modal-product__description">${n}</p>
        <p class="modal-product__shipping-information">Shipping: ${i}</p>
        <p class="modal-product__return-policy">Return Policy: ${d}</p>
        <p class="modal-product__price">Price: ${b}$</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>`}function q(t){return t.map(({id:e,thumbnail:s,title:c,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${e}">
       <img class="products__image" src="${s}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("")}function W(){r.modalBackdrop.classList.add("modal--is-open"),r.closeButton.addEventListener("click",m),r.modalBackdrop.addEventListener("click",m),x()}function m(t){t&&(t.target===r.modalBackdrop||t.target===r.closeButton)&&(r.modalBackdrop.classList.remove("modal--is-open"),r.closeButton.removeEventListener("click",m),r.modalBackdrop.removeEventListener("click",m))}async function D(){h();try{const t=await B();I(t);const o=await g();T(o),y()}catch(t){console.log(t)}}async function F(t){if(a.currentPage=1,a.totalProducts=0,!t.target.classList.contains("categories__btn"))return;const o=t.target.textContent.trim().toLowerCase();a.category=o,k(t);try{let e=[];o==="all"?e=await g():e=await S(o),e.length===0&&(l(),L()),$(e),P(),a.totalProducts>a.productsPerPage?y():l()}catch(e){console.log(e)}}async function O(){let t=[],o=0;a.currentPage+=1;try{a.category==="all"||!a.category?(t=await g(),o=a.totalProducts):(t=await S(a.category),o=a.totalProducts),M(t),a.currentPage*a.productsPerPage>=o?(l(),_.info({message:"No more products to load"})):y()}catch(e){console.log(e)}}async function A(t){t.preventDefault();const o=t.target.elements.searchValue,e=o.value.trim();if(e){a.searchQuery=e;try{const s=await E(e),c=q(s);r.productsList.innerHTML=c,o.value="",c?P():L(),l()}catch(s){_.error({message:"Something went wrong. Please, try later"}),console.log("Error in onSearchFormSubmit:",s)}}}async function H(t){const o=t.target.closest(".products__item");if(!o)return;const e=o.dataset.id;try{const s=await C(e),c=j(s);r.modalProductContainer.innerHTML=c,W()}catch(s){_.error({message:"Something went to wrong. Please, try later"}),console.log(s)}}async function R(t){const e=t.target.closest(".search-form").elements.searchValue;e.value="";try{const s=await g();$(s)}catch(s){_.error({message:"Something went wrong. Please, try later"}),console.log("Error in onSearchFormSubmit:",s)}}function N(){const t=document.querySelector(".modal-product__content");if(!t)return;const o=t.dataset.id;let e=f(p.WISH_LIST_STORAGE_KEY);const s=e.indexOf(o),c=document.querySelector(".js-wishlist-button");c&&(s===-1?(e.push(o),c.textContent="Remove from wishlist"):(e.splice(s,1),c.textContent="Add to wishlist"),v(p.WISH_LIST_STORAGE_KEY,e),h())}function x(){const t=document.querySelector(".modal-product__content");if(!t)return;const o=t.dataset.id;let e=f(p.WISH_LIST_STORAGE_KEY);const s=document.querySelector(".js-wishlist-button");s&&(s.textContent=e.includes(o)?"Remove from Wishlist":"Add to Wishlist",h())}function h(){const t=f(p.WISH_LIST_STORAGE_KEY);r.dataWishlistCount?r.dataWishlistCount.textContent=t.length:console.error("refs.dataWishlistCount is not defined")}document.addEventListener("DOMContentLoaded",D);r.categoriesList.addEventListener("click",F);r.productsList.addEventListener("click",H);r.loadMoreButton.addEventListener("click",O);r.searchForm.addEventListener("submit",A);r.searchBtnClear.addEventListener("click",R);r.modalWindow.addEventListener("click",t=>{t.target.classList.contains("js-wishlist-button")&&N()});
//# sourceMappingURL=index.js.map
