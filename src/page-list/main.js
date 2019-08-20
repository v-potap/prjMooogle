import '../scss/main.scss';
import './page.scss';
import list from './list.hbs';
const posts = document.querySelector('.posts');
const button = document.querySelector('loadMore');
const moviesButton = document.getElementById('radio-movies');
const seriesButton = document.getElementById('radio-series');
const favouritesButton = document.getElementById('radio-favorities');
let filmsData;

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-about');
  document.body.insertAdjacentHTML('beforeend', list());
});

posts.addEventListener('click', function(event) {
  const blockLink = event.target.closest('.posts__link');
  const buttonfavourite = event.target.closest('.posts-block__button1');
  console.log('blockLink', blockLink);
  console.log('event.target :', event.target);
  const id = blockLink.dataset.id;
  if(blockLink) {
    localStorage.setItem('id', id);
  }

  if(buttonfavourite) {
    let favouriteMovies = localStorage.getItem('favouriteMovies');

    if ( favouriteMovies !== null) {
      favouriteMovies = JSON.parse(favouriteMovies);
    } else {
      favouriteMovies = [];
    }

    favouriteMovies.push(filmsData.find(el => +id === el.id));
    localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
    localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
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
    filmsData = data.results;
  });
}

function getSeriesInfo() {
  return fetch(`${movieDB}discover/tv?api_key=${apiKey}&page=${page}&language=en-US&region=US&sort_by=popularity.desc`) // if series: tv instead movies
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    posts.innerHTML = '';
    posts.insertAdjacentHTML('afterbegin', list(data));
    filmsData = data.results;
  });
}

const localFavourites = JSON.parse(localStorage.getItem('favouriteMovies'));

function getfavouritesInfo() {
  return fetch(localFavourites)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    posts.innerHTML = '';
    posts.insertAdjacentHTML('afterbegin', list(data));
    filmsData = data.results;
  });
}
console.log(localFavourites);

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
});

seriesButton.addEventListener('click', function() {
  getSeriesInfo();
  localStorage.setItem('type', 'series');
});

favouritesButton.addEventListener('click', function() {
  getfavouritesInfo();
  localStorage.setItem('type', 'series');
})
