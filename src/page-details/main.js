// code.jquery.com/jquery-1.11.0.min.js';
import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import '../scss/main.scss';
import './page.scss';
import actorTemplate from "../templates/actors.hbs";
import pictureTemplate from "../templates/pictures.hbs";
import reviewTemplate from "../templates/reviews.hbs";


const localId = localStorage.getItem('id');
const localType = localStorage.getItem('type');

const movieDB = 'https://api.themoviedb.org/3/';
const apiKey = '442f08ed580949109afb21f8d78ec790';
const page = 1;

// FILM DETAILS

function getMovieInfo() {
  return fetch(`${movieDB}movie/${localId}?api_key=${apiKey}&language=en-US`) // if series: tv instead movies
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const releaseDate = new Date(data.release_date);
      const filmYear = releaseDate.getFullYear();

      document.querySelector('.film-info__title').textContent = `${data.original_title}`;
      document.querySelector('.film-release-date').textContent = `(${filmYear})`;
      document.querySelector('.film-date').textContent = filmYear;
      document.querySelector('.film-country').textContent = joinElements(data.production_countries);
      document.querySelector('.film-image').src = `https://image.tmdb.org/t/p/original${data.poster_path}`;
      document.querySelector('.film-genres').textContent = joinElements(data.genres);
      document.querySelector('.film-motto').textContent = `"${data.tagline}"`;
      document.querySelector('.film-runtime').textContent = `${data.runtime} min / ${Math.round(data.runtime / 60)} h`;
      document.querySelector('.film-info__about').textContent = data.overview;


      function joinElements(arr) {
        return arr.map(arr => arr.name).join(', ');
      }
    });
}
getMovieInfo()

console.log(localId);
console.log(localType);

function getPeopleInfo() {
  return fetch(`${movieDB}movie/${localId}/credits?api_key=${apiKey}&language=en-US`) // if series: tv instead movies
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // FILM DIRECTOR NAME

      const directors = [];
      data.crew.forEach(function (entry) {
        if (entry.job === 'Director') {
          directors.push(entry.name);
        }
        return directors.join(', ');
      });
      document.querySelector('.film-director').textContent = directors;

      // FILM SCREENPLAY NAME

      const authors = [];
      data.crew.forEach(function (entry) {
        if (entry.job === "Screenplay" || entry.job === "Writer" || entry.job === "Author") {
          authors.push(entry.name);
        }
        return authors;
      })
      document.querySelector('.film-script').textContent = authors;

      // ACTORS SLIDER

      console.log('data-- :', data);
      const actorsSlider = document.querySelector('.slider-actors');
      // console.log('actorTemplate :', actorTemplate(data.cast));
      actorsSlider.insertAdjacentHTML('beforeend', actorTemplate(data.cast));

      // SLICK ACTORS SLIDER

      $('.slider-actors').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false
        // autoplaySpeed: 1000,
      });

    })
}
getPeopleInfo()


// PICTURES SLIDER

function getMoviePictures() {
  return fetch(`${movieDB}movie/${localId}/images?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {

      console.log('data-backdrops:', data);

      const picturesSlider = document.querySelector('.slider-pictures');
      console.log(picturesSlider);
      // console.log('pictureTemplate(data.backdrops) :', pictureTemplate(data.backdrops));
      picturesSlider.insertAdjacentHTML('beforeend', pictureTemplate(data.backdrops));

      // SLICK PICTURES SLIDER

      $('.slider-pictures').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
      });

    });
}
getMoviePictures();


// TRAILER

function getMovieTrailer() {
  return fetch(`${movieDB}movie/${localId}/videos?api_key=${apiKey}&language=en-US`) // if series: tv instead movies
    .then((response) => response.json())
    .then((data) => {

      console.log('data:', data);

      console.log('data.results[0].key :', data.results[0].key);
      document.querySelector('.trailer__video').src = `https://www.youtube.com/embed/${data.results[0].key}`;
    });
}
getMovieTrailer();

// REVIEWS

function getMovieReviews() {
  return fetch(`${movieDB}movie/${localId}/reviews?api_key=${apiKey}&language=en-US&page=1`) // if series: tv instead movies
    .then((response) => response.json())
    .then((data) => {

      console.log('reviews-data:', data);

      const reviewsList = document.querySelector('.reviews-list');
      console.log(reviewsList);

      reviewsList.insertAdjacentHTML('beforeend', reviewTemplate(data.results));

      const contentArr = document.querySelectorAll(".review-text");

      contentArr.forEach((review) => {
        review.textContent = review.textContent.slice(0, 250) + '...';
      })
    });
}
getMovieReviews();

// const formatString = function (string) {
//   if (string.length >= 40) {
//     const shortString = string.slice(0, 40);
//     string = shortString + '...';
//   }
//  return string;
// }

