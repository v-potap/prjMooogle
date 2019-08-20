import "../js/search";
//import openModal from "./search";
console.log('object');
class App {
  constructor() {
    this.refs = {};
    this.refs.navButton = document.querySelector('.header__siteNav__button');
    this.refs.siteNavMenu = document.querySelector('.header__overlay');
    this.refs.menuCategory = document.querySelector('.header__siteNavCat-title');
    this.refs.searchInput = document.querySelector('.header__search');

    this.refs.navButton.addEventListener('click', this.handleClick.bind(this));
    this.refs.menuCategory.addEventListener('click', this.handleClickTitle.bind(this));
    this.refs.searchInput.addEventListener('click', this.handleClickSearchInput.bind(this));

  }

  handleClick() {
    this.refs.siteNavMenu.classList.toggle('show');
  };

  handleClickTitle() {
    this.refs.menuCategory.classList.toggle('click');
  };

  handleClickSearchInput(e) {
    e.currentTarget.classList.toggle('click');
    openModal();
    console.log('click');
  };


}

new App();
