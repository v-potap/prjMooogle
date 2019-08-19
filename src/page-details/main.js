// code.jquery.com/jquery-1.11.0.min.js';
import $ from 'jquery';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import '../scss/main.scss';

import './page.scss';


console.log('Hi all');

// slider__actors

$('.slider-actors').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
});

$('.slider-pictures').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
});

/* <script type="text/javascript" src="slick/slick.min.js"></script> */
const movieDB = 'https://api.themoviedb.org/3/';
const apiKey = '442f08ed580949109afb21f8d78ec790';
const page = 1;

function getMovieInfo() {
  return fetch(`${movieDB}discover/movie?api_key=${apiKey}&page=${page}&language=en-US&region=US&sort_by=popularity.desc`) // if series: tv instead movies
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // posts.insertAdjacentHTML('afterbegin', list(data));
  });
}

getMovieInfo()
