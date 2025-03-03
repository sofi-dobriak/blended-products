import"./assets/styles-CWKrgFVC.js";import{a as u,i as _}from"./assets/vendor-Cbhu4xvy.js";const r={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),loadMoreButton:document.querySelector(".js-load-more-button"),notFoundDiv:document.querySelector(".not-found")},e={category:null,currentPage:null,totalProducts:null,productsPerPage:12};u.defaults.baseURL="https://dummyjson.com/products/";async function y(){return(await u.get("category-list")).data}async function p(){const t=`?limit=12&skip=${(e.currentPage-1)*e.productsPerPage}`,s=await u.get(t);return e.totalProducts=s.data.total,s.data.products}async function m(o){const t=(e.currentPage-1)*12,s=`category/${o}?limit=12&skip=${t}`,a=await u.get(s);return e.totalProducts=a.data.total,a.data.products}function P(o){o.unshift("all");const t=o.map(s=>`<li class="categories__item">
            <button class="categories__btn" type="button">${s}</button>
        </li>`).join("");r.categoriesList.innerHTML=t}function f(o){const t=o.map(({id:s,thumbnail:a,title:c,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${s}">
       <img class="products__image" src="${a}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");r.productsList.insertAdjacentHTML("beforeend",t)}function L(o){const t=o.map(({id:s,thumbnail:a,title:c,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${s}">
       <img class="products__image" src="${a}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");r.productsList.innerHTML=t}function $(o){const t=o.map(({id:s,thumbnail:a,title:c,brand:n,category:i,price:d})=>`
    <li class="products__item" data-id="${s}">
       <img class="products__image" src="${a}" alt="${c}" />
       <p class="products__title">${c}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${n}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${d}$</p>
    </li>`).join("");r.productsList.insertAdjacentHTML("beforeend",t)}function b(o){const t=document.querySelector(".categories__btn--active");t&&t!==o.target&&t.classList.remove("categories__btn--active"),o.target.classList.add("categories__btn--active")}function B(){r.notFoundDiv.classList.add("not-found--visible")}function g(){r.loadMoreButton.classList.remove("hide")}function l(){r.loadMoreButton.classList.add("hide")}async function k(){try{const o=await y();P(o);const t=await p();f(t),g()}catch(o){console.log(o)}}async function w(o){if(e.currentPage=1,e.totalProducts=0,!o.target.classList.contains("categories__btn"))return;const t=o.target.textContent.trim().toLowerCase();e.category=t,b(o);try{let s=[];t==="all"?s=await p():s=await m(t),s.length===0&&(l(),B()),L(s),e.totalProducts>e.productsPerPage?g():l()}catch(s){console.log(s)}}async function C(o){o.preventDefault(),e.currentPage+=1;try{let t=[];e.category?t=await m(e.category):t=await p(),$(t),e.currentPage*e.productsPerPage>=e.totalProducts?(l(),_.info({message:"No more products to load"})):g()}catch(t){_.error({message:"Something went to wrong. Please, try later"}),console.log(t)}}document.addEventListener("DOMContentLoaded",k);r.categoriesList.addEventListener("click",w);r.loadMoreButton.addEventListener("click",C);
//# sourceMappingURL=index.js.map
