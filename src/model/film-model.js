import Observable from '../framework/observable.js';
import {updateItem} from '../utils/utils.js';

export default class FilmsModel extends Observable {
  #films = null;

  set films(films) {
    this.#films = films;
  }

  get films() {
    return this.#films;
  }

  updateFilm(film) {
    this.#films = updateItem(this.#films, film);
    this._notify('Minor', film);
  }
}


