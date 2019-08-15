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
  return fetch(`${movieDB}movie/popular?api_key=${apiKey}&page=${page}&language=en-US`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    posts.insertAdjacentHTML('afterbegin', list(data));
  });
}

getMovieInfo();
