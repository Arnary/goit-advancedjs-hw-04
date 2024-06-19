import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getPhoto } from "./pixabay-api";

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const guard = document.querySelector(".js-guard");

form.addEventListener("input", (event) => {query = event.target.value.trim();});
form.addEventListener("submit", handlerSubmit);

let page = 1;
let query;
let options = {
    root: null,
    rootMargin: "300px",
};

const observer = new IntersectionObserver(handlerLoadMore, options);

const lightbox = new SimpleLightbox('.gallery a');

function handlerSubmit(event) {
  event.preventDefault();
  observer.unobserve(guard);
  page = 1;

  if (!query) {
    gallery.innerHTML = "";
    iziToast.info({
      position: "topRight",
      message: "You should enter a query in the search field.",
      maxWidth: "400px",
      timeout: 2000,
      messageColor: "black",
    });
    return;
  }; 

  getPhoto(query, page).then((data) => { 
    if (data.totalHits === 0) {
      gallery.innerHTML = "";
      iziToast.error({
        position: "topRight",
        message: "Sorry, there are no images matching your search query. Please try again.",
        backgroundColor: "rgb(245, 156, 22)",
        maxWidth: "400px",
        timeout: 3000,
        messageColor: "black",
      });
      return;
    };

    iziToast.success({
        position: "topRight",
        message: `Hooray! We found ${data.totalHits} images.`,
        timeout: 2000,
        messageColor: "black",
    });

    gallery.innerHTML = createGallery(data.hits);
    
    lightbox.refresh();
    
    window.scrollTo(0, 0);
    
    observer.observe(guard);

    if (page*40 >= data.totalHits) {
      iziToast.info({
          position: "bottomCenter",
          message: "We're sorry, but you've reached the end of search results.",
          messageColor: "black",
      });
      observer.unobserve(guard);
    };
  }).catch((err) => {
        console.log(err);
    });
};

function createGallery(arr) {
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="photo-card">
      <a class="gallery-link" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${downloads}
        </p>
      </div>
    </div>`
  ).join("");
};

function handlerLoadMore(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      page += 1;

        getPhoto(query, page).then((data) => {
          gallery.insertAdjacentHTML(
              "beforeend",
              createGallery(data.hits)
            );
            
          lightbox.refresh();
          
          if (page*40 >= data.totalHits) {
            iziToast.info({
                position: "bottomCenter",
                message: "We're sorry, but you've reached the end of search results.",
                messageColor: "black",
            });
            observer.unobserve(guard);
          };
        });
      };
  });
};
