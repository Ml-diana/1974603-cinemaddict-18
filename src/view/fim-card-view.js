import {createElement} from '../render.js';
import { createFilmCardInfoTemplate } from './film-card-info-view.js';
import { createFilmDetailsControisTemplate } from './film-details-controls-view';

export const createFilmCardTemplate = ({filmInfo, comments}) =>
  `<article class="film-card">
  ${createFilmCardInfoTemplate(filmInfo, comments.length)}
  ${createFilmDetailsControisTemplate()}
</article>`;

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

