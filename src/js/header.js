import search from "../js/search";
import itemCategory from "../templates/category.hbs";
import movieDBService from "../js/api-service";

class App {
  constructor() {
    this.refs = {};
    this.refs.navButton = document.querySelector('.header__siteNav__button');
    this.refs.siteNavMenu = document.querySelector('.header__overlay');
    this.refs.menuCategory = document.querySelector('.header__siteNavMenu');
    this.refs.itemCategoryMenu = document.querySelectorAll('.siteNavCat__item');
    this.refs.searchInput = document.querySelector('.header__search');

    this.refs.navButton.addEventListener('click', this.handleClick.bind(this));
    this.refs.menuCategory.addEventListener('click', this.handleClickTitle.bind(this));
    this.refs.searchInput.addEventListener('click', this.handleClickSearchInput.bind(this));

  }

  handleClick() {
    this.refs.siteNavMenu.classList.toggle('show');
  };

async handleClickTitle(e) {
    const li = e.target.closest('.header__siteNavCat');
    const ul = li.querySelector('.siteNavCat__item');
    this.refs.itemCategoryMenu.forEach(element => {
      element.innerHTML = '';
    });
    if(!ul.hasChildNodes()) {
      this.refs.menuCategory.classList.toggle('click');
      const storage = e.target.closest('h2').textContent.toLowerCase();
      if(storage === "favorites") {
        const evt = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
      });
      this.refs.siteNavMenu.classList.toggle('show');
      document.querySelector("#radio-favorities").dispatchEvent(evt);
      return;
      }
      movieDBService.setStorage(storage === "movie"?storage:"tv");
      const listCategory = await movieDBService.getGenres();
      const markup = listCategory.map(el => itemCategory(el)).join("");
      ul.insertAdjacentHTML("beforeend", markup);
    }
  };

  handleClickSearchInput(e) {
    e.currentTarget.classList.toggle('click');
  };

}

new App();
