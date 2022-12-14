import Observable from '../framework/observable.js';

export default class FilmsModel extends Observable {
  #films = [];
  #filmsApiService = null;

  constructor(filmsApiService) {
    super();
    this.#filmsApiService = filmsApiService;
  }

  set films(films) {
    this.#films = films;
  }

  get films() {
    return this.#films;
  }

  init = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptToClient);
    }
    catch(err) {
      this.#films = [];
    }
    this._notify('Init');
  };

  updateFilm = async(film) => {
    const index = this.#films.findIndex((item) => item.id === film.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }
    try {
      const response = await this.#filmsApiService.updateFilm(film);
      const updatedFilm = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        film,
        ...this.#films.slice(index + 1),
      ];

      this._notify('Minor', updatedFilm);

    } catch(err) {
      throw new Error('Can\'t update film');
    }
  };

  #adaptToClient = (film) => ({
    id: film['id'],
    comments: film['comments'],
    filmInfo: {
      title: film['film_info']['title'],
      alternativeTitle: film['film_info']['alternative_title'],
      rating: film['film_info']['total_rating'],
      poster: film['film_info']['poster'],
      ageRating: film['film_info']['age_rating'],
      director: film['film_info']['director'],
      writers:film['film_info']['writers'],
      actors: film['film_info']['actors'],
      release: {
        date: film['film_info']['release']['date'],
        releaseCountry: film['film_info']['release']['release_country'],
      },
      runtime: film['film_info']['runtime'],
      genres: film['film_info']['genre'],
      description: film['film_info']['description']
    },
    userDetails: {
      watchlist: film['user_details']['watchlist'],
      alreadyWatched: film['user_details']['already_watched'],
      watchingDate: film['user_details']['watching_date'] !== null ? new Date(film['user_details']['watching_date']) : film['user_details']['watching_date'],
      favorite: film['user_details']['favorite'],
    },
  });
}


