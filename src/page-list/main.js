import '../scss/main.scss';
import './page.scss';
import list from './list.hbs';
const posts = document.querySelector('.posts');
const button = document.querySelector('loadMore');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'page-about');
  document.body.insertAdjacentHTML('beforeend', list());
});


const movieDB = 'https://api.themoviedb.org/3/';
const apiKey = '442f08ed580949109afb21f8d78ec790';
const page = 1;

function getMovieInfo() {
  return fetch(`${movieDB}discover/movie?api_key=${apiKey}&page=${page}&language=en-US&region=US&sort_by=popularity.desc`) // if series: tv instead movies
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
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
getMoviesGenres();
getSeriesGenres()
