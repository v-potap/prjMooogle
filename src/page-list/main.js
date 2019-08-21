import "../scss/main.scss";
import "./page.scss";
import list from "./list.hbs";
import movieDBService from "../js/api-service";
const posts = document.querySelector(".posts");
const button = document.querySelector("loadMore");
const moviesButton = document.getElementById("radio-movies");
const seriesButton = document.getElementById("radio-series");
const favouritesButton = document.getElementById("radio-favorities");
let filmsData;

posts.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    return
  }
  const blockLink = event.target.closest('.posts__link');
  const buttonfavourite = event.target.closest('.posts-block__button1');
  const id = blockLink.dataset.id;
  const title = blockLink.dataset.title;

  if(blockLink) {
    localStorage.setItem('id', id);
    if(!title) {
      localStorage.setItem("type", "series");
    } else {
      localStorage.setItem("type", "movie");
    }
  }

  if (buttonfavourite) {
    let favouriteMovies = localStorage.getItem("favouriteMovies");
    const clickedMovie = (filmsData.find(el => +id === el.id) || {}).id;

    if (favouriteMovies !== null) {
      favouriteMovies = JSON.parse(favouriteMovies);
    } else {
      favouriteMovies = [];
    }

    if (clickedMovie && !favouriteMovies.find(movie => movie.id === clickedMovie)) {
      favouriteMovies.push(filmsData.find(el => +id === el.id));
      buttonfavourite.classList.add('button_color');
    } else {
      favouriteMovies = favouriteMovies.filter(el => el.id !== (clickedMovie || +id));
      buttonfavourite.classList.remove('button_color');
      if (localStorage.getItem("activeFavourites", "favourites")) {
        blockLink.remove();
      }
    }

    localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
  }
});

const movieDB = "https://api.themoviedb.org/3/";
const apiKey = "442f08ed580949109afb21f8d78ec790";
const page = 1;

function getMovieInfo() {
  return fetch(`${movieDB}discover/movie?api_key=${apiKey}&page=${page}&language=en-US&region=US&sort_by=popularity.desc`) // if series: tv instead movies
  .then((response) => response.json())
  .then((data) => {

    let favor = localStorage.getItem('favouriteMovies');
    if ( favor !== null) {
      favor = JSON.parse(favor);
    } else {
      favor = [];
    }
    favor = favor.map(el => el.id);

    const newData = data.results.map(el => {
      if(favor.includes(el.id)) {
          el.fav = true;

      }
      return el;
    });

    posts.innerHTML = '';
    posts.insertAdjacentHTML('afterbegin', list(newData));
    filmsData = newData;
  });
}

function getSeriesInfo() {
  return fetch(
    `${movieDB}discover/tv?api_key=${apiKey}&page=${page}&language=en-US&region=US&sort_by=popularity.desc`
  )
    .then(response => response.json())
    .then(data => {

      let favor = localStorage.getItem('favouriteMovies');
    if ( favor !== null) {
      favor = JSON.parse(favor);
    } else {
      favor = [];
    }
    favor = favor.map(el => el.id);

    const newData = data.results.map(el => {
      if(favor.includes(el.id)) {
          el.fav = true;

      }
      return el;
    });

      posts.innerHTML = "";
      posts.insertAdjacentHTML("afterbegin", list(data.results));
      filmsData = data.results;
    });
}

function getfavouritesInfo() {
  const localFavourites = JSON.parse(localStorage.getItem("favouriteMovies"));
  posts.innerHTML = "";
  let blockFavourites = list(localFavourites);
  posts.insertAdjacentHTML("afterbegin", blockFavourites);
}

getMovieInfo();

moviesButton.addEventListener("click", function() {
  getMovieInfo();
  localStorage.setItem("activeFavourites", "");
});

seriesButton.addEventListener("click", function() {
  getSeriesInfo();
  localStorage.setItem("activeFavourites", "");
});

favouritesButton.addEventListener("click", function() {
  getfavouritesInfo();
  (document.querySelectorAll('.posts-block__button1')).forEach(element => {
    element.classList.add('button_color');
  });
  localStorage.setItem("activeFavourites", "favourites");
});
