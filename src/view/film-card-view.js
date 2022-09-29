import AbstractView from '../framework/view/abstract-view.js';
import {formatMinutes} from '../utils/utils.js';

export const createFilmCardTemplate = (film) => `<article class="film-card">
  <a class="film-card__link">
  <h3 class="film-card__title">${film.filmInfo.title}</h3>
  <p class="film-card__rating">${film.filmInfo.rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${film.filmInfo.release.date}</span>
    <span class="film-card__duration">${formatMinutes(film.filmInfo.runtime)}</span>
    <span class="film-card__genre">${film.filmInfo.genres[0]}</span>
  </p>
  <img src="${film.filmInfo.poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${film.filmInfo.description}</p>
  <span class="film-card__comments">${film.comment.length} comments</span>
</a>
<div class="film-card__controls">
<button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${film.filmInfo.userDetails.watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
<button class="film-card__controls-item film-card__controls-item--mark-as-watched ${film.filmInfo.userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
<button class="film-card__controls-item film-card__controls-item--favorite ${film.filmInfo.userDetails.favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
</div>
</article>`;

export default class FilmCardView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setClickCardHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickCardHandler);
  };

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#addToWatchlistClickHandler);
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  setAddToFavoritesClickHandler = (callback) => {
    this._callback.addToFavoritesClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#addToFavoritesClickHandler);
  };

  #clickCardHandler = () => {
    this._callback.click(this.#film);
  };

  #addToWatchlistClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.addToWatchlistClick();
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.alreadyWatchedClick();
  };

  #addToFavoritesClickHandler = (evt) => {
    evt.stopPropagation();
    this._callback.addToFavoritesClick();
  };
}
