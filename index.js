import"./assets/styles-BK7AYJoX.js";import{a as r}from"./assets/vendor-N5iQpiFS.js";const n={categoriesList:document.querySelector(".categories"),productsList:document.querySelector(".products"),notFoundDiv:document.querySelector(".not-found")},d=1;r.defaults.baseURL="https://dummyjson.com/products/";async function l(){return(await r.get("category-list")).data}async function p(){const s=`?limit=12&skip=${(d-1)*12}`;return(await r.get(s)).data.products}async function _(t){const s="category",o=(d-1)*12,c=`${s}/${t}?limit=12&skip=${o}`;return(await r.get(c)).data.products}function g(t){t.unshift("all");const s=t.map(o=>`<li class="categories__item">
            <button class="categories__btn" type="button">${o}</button>
        </li>`).join("");n.categoriesList.innerHTML=s}function m(t){const s=t.map(({id:o,thumbnail:c,title:e,brand:a,category:i,price:u})=>`
    <li class="products__item" data-id="${o}">
       <img class="products__image" src="${c}" alt="${e}" />
       <p class="products__title">${e}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${a}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${u}$</p>
    </li>`).join("");n.productsList.insertAdjacentHTML("beforeend",s)}function y(t){const s=t.map(({id:o,thumbnail:c,title:e,brand:a,category:i,price:u})=>`
    <li class="products__item" data-id="${o}">
       <img class="products__image" src="${c}" alt="${e}" />
       <p class="products__title">${e}</p>
       <p class="products__brand">
         <span class="products__brand--bold">Brand: ${a}</span>
       </p>
       <p class="products__category">Category: ${i}</p>
       <p class="products__price">Price: ${u}$</p>
    </li>`).join("");n.productsList.innerHTML=s}function $(){refs.notFoundDiv.classList.add("not-found--visible")}function f(t){const s=document.querySelector(".categories__btn--active");s&&s!==t.target&&s.classList.remove("categories__btn--active"),t.target.classList.add("categories__btn--active")}async function L(){try{const t=await l();g(t);const s=await p();m(s),n.categoriesList.addEventListener("click",b)}catch(t){console.log(t)}}async function b(t){if(!t.target.classList.contains("categories__btn"))return;const s=t.target.textContent.trim().toLowerCase();f(t);try{let o=[];s==="all"?o=await p():o=await _(s),o.length===0&&$(),y(o)}catch(o){console.log(o)}}document.addEventListener("DOMContentLoaded",L);
//# sourceMappingURL=index.js.map
