import {generateFilms} from '../mock/film-data.js';

export default class FilmsModel {
  films = generateFilms();
  get = () => this.films;
}
