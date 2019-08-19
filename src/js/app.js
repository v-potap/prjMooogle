class App {
  constructor() {
    this.refs = {};
    this.refs.navButton = document.querySelector('.header__siteNav__button');
    this.refs.siteNavMenu = document.querySelector('.header__overlay');

    this.refs.navButton.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    this.refs.siteNavMenu.classList.toggle('show');
  }

  
}

new App();
