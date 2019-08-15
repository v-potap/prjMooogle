import '../scss/main.scss';
// code.jquery.com/jquery-1.11.0.min.js';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import $ from 'jquery'
import 'slick-carousel'

import './page.scss';


console.log('Hi all');

// slider__actors

$('.slider__actors').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3
});

/* <script type="text/javascript" src="slick/slick.min.js"></script> */
