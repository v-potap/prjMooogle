import '../scss/main.scss';
import './page.scss';
import list from './list.hbs';
import '../js/header';
const posts = document.querySelector('.posts');
const button = document.querySelector('loadMore');
const moviesButton = document.getElementById('radio-movies');
const seriesButton = document.getElementById('radio-series');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-about');
  document.body.insertAdjacentHTML('beforeend', list());
});

posts.addEventListener('click', function(event) {
  // event.preventDefault();
  // console.log(event.target.nodeName);
  console.log(event.target.closest('.posts-block__button1'));
  const blockLink = event.target.closest('.posts-block');
  console.log(blockLink);
  const buttonfavourite = event.target.closest('.posts-block__button1');
  const id = blockLink.dataset.id;
  if(blockLink) {
    localStorage.setItem('id', id);
  }
});

const movieDB = 'https://api.themoviedb.org/3/';
const apiKey = '442f08ed580949109afb21f8d78ec790';
const page = 1;

function getMovieInfo() {
  return fetch(`${movieDB}discover/movie?api_key=${apiKey}&page=${page}&language=en-US&region=US&sort_by=popularity.desc`) // if series: tv instead movies
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    posts.innerHTML = '';
    posts.insertAdjacentHTML('afterbegin', list(data));
  });
}

function getSeriesInfo() {
  return fetch(`${movieDB}discover/tv?api_key=${apiKey}&page=${page}&language=en-US&region=US&sort_by=popularity.desc`) // if series: tv instead movies
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    posts.innerHTML = '';
    posts.insertAdjacentHTML('afterbegin', list(data));
  });
}

function getMoviesGenres() {
  return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=442f08ed580949109afb21f8d78ec790&language=en-US`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

function getSeriesGenres() {
  return fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=442f08ed580949109afb21f8d78ec790&language=en-US`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
}

getMovieInfo();
// getSeriesInfo();
getMoviesGenres();
getSeriesGenres()

moviesButton.addEventListener('click', function() {
  getMovieInfo();
  localStorage.setItem('type', 'movie');
})

seriesButton.addEventListener('click', function() {
  getSeriesInfo();
  localStorage.setItem('type', 'series');
})

// setTimeout(() => {
//   const favouriteButton = document.querySelector('.posts-block__button1');

//   favouriteButton.addEventListener('click', function() {
//     alert('Hello!');
//   });
// }, 1000);
