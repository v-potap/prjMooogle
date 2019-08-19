export default class MovieDBService {
  constructor() {
    this.movieDB = "https://api.themoviedb.org/3/";
    this.apiKey = "442f08ed580949109afb21f8d78ec790";
    this.page = 1;
    this.resource = "discover/";
    this.genres = "genre/";
    this.storage = "movie";
    this.region = "US";
    this.language = "en-US";
    this.sortBy = "popularity.desc";
  }

  getInfoStr() {
    return (
      `${this.movieDB}` +
      `${this.resource}` +
      `${this.storage}` +
      `?` +
      `api_key=${this.apiKey}&` +
      `language=en-US&` +
      `region=US&` +
      (this.sortBy === "none" ? `` : `sort_by=${this.sortBy}&`) +
      `page=${this.page}`
    );
  }

  async getInfo() {
    let infoItems = [];
    try {
      const response = await fetch(this.getInfoStr());
      const json = response.json();
      infoItems = json.hits;
    } catch (err) {
      console.log(err);
    }
    return infoItems;
  }

  getInfoNext() {
    this.page++;
    return this.getInfo();
  }

  getGenresStr() {
    return (
      `${this.movieDB}` +
      `${this.resource}` +
      `${this.genres}` +
      `?` +
      `api_key=${this.apiKey}&` +
      `language=en-US`
    );
  }

  async getGenres() {
    let infoItems = [];
    try {
      const response = await fetch(this.getGenresStr());
      const json = response.json();
      infoItems = json.hits;
    } catch (err) {
      console.log(err);
    }
    return infoItems;
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
}
