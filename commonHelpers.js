import{a as b,S as v,i as c}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const L="44432226-c2b8db609e5d1d7f1a74c07d6",w="https://pixabay.com/api/";async function m(r,t,s=40){const i=await b.get(w,{params:{key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:s}});if(i.status!=200)throw new Error(i.statusText);return i.data}const p=document.querySelector(".search-form"),l=document.querySelector(".gallery"),u=document.querySelector(".js-guard");p.addEventListener("input",r=>{d=r.target.value});p.addEventListener("submit",x);let a=1,d,S={root:null,rootMargin:"300px"};const f=new IntersectionObserver($,S),g=new v(".gallery a");function x(r){r.preventDefault(),f.unobserve(u),a=1,m(d,a).then(t=>{if(t.totalHits===0){l.innerHTML="",c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again.",backgroundColor:"rgb(245, 156, 22)",maxWidth:"400px",timeout:3e3,messageColor:"black"});return}c.success({position:"topRight",message:`Hooray! We found ${t.totalHits} images.`,timeout:2e3,messageColor:"black"}),l.innerHTML=h(t.hits),g.refresh(),window.scrollTo(0,0),f.observe(u)}).catch(t=>{console.log(t)})}function h(r){return r.map(({webformatURL:t,largeImageURL:s,tags:i,likes:e,views:o,comments:n,downloads:y})=>`<div class="photo-card">
        <a class="gallery-link" href="${s}">
        <img src="${t}" alt="${i}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${e}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${o}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${n}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${y}
          </p>
        </div>
      </div>`).join("")}function $(r){r.forEach(t=>{t.isIntersecting&&(a+=1,m(d,a).then(s=>{l.insertAdjacentHTML("beforeend",h(s.hits)),g.refresh(),a*40>=s.totalHits&&(c.info({position:"bottomCenter",message:"We're sorry, but you've reached the end of search results.",messageColor:"black"}),f.unobserve(u))}))})}
//# sourceMappingURL=commonHelpers.js.map
