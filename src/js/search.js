import movieDBService from "./api-service";
class Search {
  constructor() {
    this.refs = {};
    this.refs.searchForm = document.querySelector("#modal-search-form");
    this.refs.input = document.querySelector("#modal-search-input");
    this.refs.modalform = document.querySelector(".modal-form");
    this.refs.first_button = document.querySelector(".header__search");
    this.refs.overlay = document.querySelector(".modal-overlay");
    this.refs.closeModalBtn = document.querySelector(
      'button[data-action="close-modal-form"]'
    );

    this.refs.searchForm.addEventListener(
      "submit",
      this.searchMovieHandle.bind(this)
    );
    this.refs.first_button.addEventListener("click", this.openModal.bind(this));
    this.refs.overlay.addEventListener("click", this.closeModal.bind(this));
    this.refs.closeModalBtn.addEventListener(
      "click",
      this.closeModal.bind(this)
    );
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
    movieDBService.setQuery(inputValue);
    localStorage.setItem("queryString", inputValue);
    const i = localStorage.getItem("queryString");
    this.closeModal();
  
    if(window.location.pathname !== '/index.html') {
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
