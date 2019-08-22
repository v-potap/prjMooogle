/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MovieDBService {
  constructor(storage, query) {
    this.movieDB = "https://api.themoviedb.org/3/";
    this.apiKey = "442f08ed580949109afb21f8d78ec790";
    this.page = 1;
    this.discover = "discover/";
    this.genres = "genre/";
    this.search = "search/";
    this.storage = storage ? storage : "movie";
    this.region = "US";
    this.language = "en-US";
    this.sortBy = "popularity.desc";
    this.query = query;
  }

  getInfoStr() {
    return `${this.movieDB}` + `${this.discover}` + `${this.storage}` + `?` + `api_key=${this.apiKey}&` + `language=en-US&` + `region=US&` + (this.sortBy === "none" ? `` : `sort_by=${this.sortBy}&`) + `page=${this.page}`;
  }

  async getInfo() {
    let infoItems = [];

    try {
      const response = await fetch(this.query === "" ? this.getInfoStr() : this.getSearchStr());
      const json = await response.json();
      infoItems = json.results;
    } catch (err) {
      console.log(err);
    }

    return infoItems;
  }

  getGenresStr() {
    return `${this.movieDB}` + `${this.genres}` + `${this.storage}` + `/list?` + `api_key=${this.apiKey}&` + `language=en-US`;
  }

  async getGenres() {
    let infoItems = [];

    try {
      const response = await fetch(this.getGenresStr());
      const json = await response.json();
      infoItems = json.genres;
    } catch (err) {
      console.log(err);
    }

    return infoItems;
  }

  getSearchStr() {
    return `${this.movieDB}` + `${this.search}` + `${this.storage}` + `?` + `api_key=${this.apiKey}&` + `language=en-US&` + `query=${this.query}&` + (this.sortBy === "none" ? `` : `sort_by=${this.sortBy}&`) + `page=${this.page}`;
  }

  setPage(page) {
    this.page = page;
  }

  setResource(resource) {
    this.resource = resource;
  }

  setStorage(storage) {
    this.storage = storage;
  }

  setSortBy(sortBy) {
    this.sortBy = sortBy;
  }

  setQuery(query) {
    this.query = query;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (new MovieDBService(localStorage.getItem("activeFavorities"), localStorage.getItem("queryString") ? localStorage.getItem("queryString") : ""));

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


class Search {
  constructor() {
    this.refs = {};
    this.refs.searchForm = document.querySelector("#modal-search-form");
    this.refs.input = document.querySelector("#modal-search-input");
    this.refs.modalform = document.querySelector(".modal-form");
    this.refs.first_button = document.querySelector(".header__search");
    this.refs.overlay = document.querySelector(".modal-overlay");
    this.refs.closeModalBtn = document.querySelector('button[data-action="close-modal-form"]');
    this.refs.searchForm.addEventListener("submit", this.searchMovieHandle.bind(this));
    this.refs.first_button.addEventListener("click", this.openModal.bind(this));
    this.refs.overlay.addEventListener("click", this.closeModal.bind(this));
    this.refs.closeModalBtn.addEventListener("click", this.closeModal.bind(this));
  }

  openModal(e) {
    e.preventDefault();
    this.refs.modalform.classList.add("is-open");
    this.refs.overlay.classList.add("is-open");
    window.addEventListener("keydown", this.handleButtonPress.bind(this));
    this.refs.input.focus();
  }

  closeModal() {
    this.refs.modalform.classList.remove("is-open");
    this.refs.overlay.classList.remove("is-open");
    window.removeEventListener("keydown", this.handleButtonPress.bind(this));
  }

  handleButtonPress(e) {
    if (e.code !== "Escape") {
      return;
    }

    this.closeModal();
  }

  async searchMovieHandle(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const inputtwo = form.elements.mdsearch;
    const inputValue = inputtwo.value;
    inputtwo.value = "";
    _api_service__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].setQuery(inputValue);
    localStorage.setItem("queryString", inputValue);
    const i = localStorage.getItem("queryString");
    this.closeModal();

    if (window.location.pathname !== '/index.html') {
      window.location.pathname = '/index.html';
    }

    const storage = localStorage.getItem("activeFavorities");

    if (storage !== "favorites") {
      const evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
      });

      if (storage === "tv") {
        document.querySelector("#radio-series").dispatchEvent(evt);
      } else if (storage === "movie") {
        document.querySelector("#radio-movies").dispatchEvent(evt);
      }
    }
  }

}

new Search();

/***/ })

/******/ });
//# sourceMappingURL=search.e4c4e1ea147c6956a22d.js.map