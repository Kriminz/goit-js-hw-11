import ImgApiGallery from "./fetchImages"
import LoadMoreBtn from "./loadMore"
import axios from 'axios';
import Notiflix from 'notiflix';
import './css/styles.css';

// const DEBOUNCE_DELAY = 300;

const refs ={
  form: document.querySelector("#search-form"),
  imgGallery: document.querySelector(".gallery"),
  cardPhoto: document.querySelector(".photo-card")
}

// const cardHeight = cardPhoto.style.height;
var scrollTop = window.pageYOffset || document.documentElement.scrollTop||document.body.scrollTop;
var scrollHeight = document.documentElement.scrollHeight;
var clientHeight = document.documentElement.clientHeight;
var height = scrollHeight + clientHeight;


const imgApiGallery = new ImgApiGallery();
const loadMoreBtn = new LoadMoreBtn({
  selector: ".load-more",
});

refs.form.addEventListener('submit', formFetch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

// console.log(form.value);
// Робота в form
function formFetch(e) {
  e.preventDefault();

  imgApiGallery.query = e.currentTarget.elements.searchQuery.value.trim();

  // console.log(searchQuery);
  loadMoreBtn.show();
  imgApiGallery.resetPages();
  imgApiGallery.fetchImages().then(images => {
    clearGallery();
    renderList(images);
  });
}

function onLoadMore() {
  imgApiGallery.fetchImages().then(renderList);
}

// Перевірка пошуку
function renderList(images) {
  console.log(images);

  appendGalleryMarkup(images);
  if(images.total === 0) {
    loadMoreBtn.hide();
    Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
  }
  else if(images.hits.length === 0) {
    loadMoreBtn.hide();
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

// Створення розмітки
async function appendGalleryMarkup(images) {
  const galleryCreate = await images.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return`
    <div class="photo-card">
      <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>
    `;}).join('');

    refs.imgGallery.insertAdjacentHTML('beforeend', galleryCreate);
}

function clearGallery() {
  refs.imgGallery.innerHTML = '';
}