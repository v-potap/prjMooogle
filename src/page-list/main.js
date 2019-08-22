import "../scss/main.scss";
import "./page.scss";
import list from "./list.hbs";
import movieDBService from "../js/api-service";
const posts = document.querySelector(".posts");
const buttonLoadMore = document.querySelector(".loadMore");
const storage = document.querySelector(".form-storages");
const sortBy = document.querySelector(".list-handler__sort-inputs");

let filmsData;

showInfo();

posts.addEventListener("click", handlePostClick);
storage.addEventListener("click", handleStorageClick);
buttonLoadMore.addEventListener("click", handleLoadMoreClick);
sortBy.addEventListener("click", handleSortClick);

function handleSortClick(e) {
  if (e.target.tagName === "INPUT") {
    posts.innerHTML = "";
    console.log("e.target.name :", e.target.name);
    if (e.target.name === "sort-by-title") {
      document.querySelector("#radio-date-none").checked = true;
    } else {
      document.querySelector("#radio-title-none").checked = true;
    }
    movieDBService.setPage(1);
    movieDBService.setSortBy(e.target.value);
    showInfo();
  }
}

function handleLoadMoreClick() {
  movieDBService.setPage(movieDBService.page + 1);
  showInfo();
}

function handleStorageClick(e) {
  if (e.target.tagName === "INPUT") {
    const currentStorage = e.target.value;
    if (currentStorage === movieDBService.storage) {
      return;
    }
    localStorage.setItem("activeFavorities", currentStorage);
    posts.innerHTML = "";
    document.querySelector('.loadMore').classList.add('visible');

    if (currentStorage === "favorities") {
      showFavoritiesInfo();
      if ((document.querySelectorAll(".posts-block__button1")).length <= 20) {
        document.querySelector('.loadMore').classList.remove('visible');
      }
      document.querySelectorAll(".posts-block__button1").forEach(element => {
        element.classList.add("button_color");
      });
    } else {
      movieDBService.setStorage(currentStorage);
      movieDBService.setPage(1);
      showInfo();
    }
  }
}

function handlePostClick(event) {
  if (event.target === event.currentTarget) {
    return;
  }

  const blockLink = event.target.closest(".posts__link");
  const buttonfavourite = event.target.closest(".posts-block__button1");
  const id = blockLink.dataset.id;
  const title = blockLink.dataset.title;

  if (blockLink) {
    localStorage.setItem("id", id);
    if (!title) {
      localStorage.setItem("type", "tv");
    } else {
      localStorage.setItem("type", "movie");
    }
  }

  if (buttonfavourite) {
    let favoriteMovies = localStorage.getItem("favoriteMovies");
    const clickedMovie = (filmsData.find(el => +id === el.id) || {}).id;

    if (favoriteMovies !== null) {
      favoriteMovies = JSON.parse(favoriteMovies);
    } else {
      favoriteMovies = [];
    }

    if (
      clickedMovie &&
      !favoriteMovies.find(movie => movie.id === clickedMovie)
    ) {
      favoriteMovies.push(filmsData.find(el => +id === el.id));
      buttonfavourite.classList.add("button_color");
    } else {
      favoriteMovies = favoriteMovies.filter(
        el => el.id !== (clickedMovie || +id)
      );
      buttonfavourite.classList.remove("button_color");
      if (localStorage.getItem("activeFavorities", "favorities") === "favorities") {
        blockLink.remove();
        // console.log(localStorage.getItem("activeFavorities", "favorities"));
      }
    }

    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }
}

async function showInfo() {
  const data = await movieDBService.getInfo();

  let favor = localStorage.getItem("favoriteMovies");
  if (favor !== null) {
    favor = JSON.parse(favor);
  } else {
    favor = [];
  }

  favor = favor.map(el => el.id);

  const newData = data.map(el => {
    if (favor.includes(el.id)) {
      el.fav = true;
    }
    return el;
  });

  posts.insertAdjacentHTML("beforeend", list(newData));
  filmsData = newData;
}

function showFavoritiesInfo() {
  const localFavorities = JSON.parse(localStorage.getItem("favoriteMovies"));

  let blockFavorities = list(localFavorities);
  posts.insertAdjacentHTML("beforeend", blockFavorities);
}
