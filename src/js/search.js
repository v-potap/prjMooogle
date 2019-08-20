class Search {
  constructor() {
    this.refs = {};
    this.refs.input = document.querySelector("search-form__field");
    console.log('begin');
    this.refs.modalform = document.querySelector(".modal-form");
    this.refs.first_button = document.querySelector(".header__search");
    this.refs.overlay = document.querySelector(".modal-overlay");
    this.refs.closeModalBtn = document.querySelector('button[data-action="close-modal-form"]');

    this.refs.first_button.addEventListener("click", this.openModal.bind(this));
    this.refs.overlay.addEventListener("click", this.closeModal.bind(this));
    this.refs.closeModalBtn.addEventListener("click", this.closeModal.bind(this));
    console.log('end');
  }

  openModal(e) {
    e.preventDefault();
    this.refs.modalform.classList.add("is-open");
    this.refs.overlay.classList.add("is-open");
    window.addEventListener("keydown", this.handleButtonPress.bind(this));
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
}

new Search();