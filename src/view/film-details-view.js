import {createElement} from '../render.js';
import { createFilmDetailsInfoTemplate} from './film-details-info-view.js';
import {createFilmDetailsControisTemplate} from './film-details-controls-view.js';
import {createFilmDetailsCommentsTemplate} from './film-details-comment-view.js';
import {createFilmDetailsCommentsEmojiTemplate} from './film-details-emoji-list-view.js';

const createPopupTemplate = (filmInfo, comments) => (
  `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      ${createFilmDetailsInfoTemplate(filmInfo)}
      ${createFilmDetailsControisTemplate()}

    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        ${createFilmDetailsCommentsTemplate}
        ${createFilmDetailsCommentsEmojiTemplate}
      </section>
    </div>
  </div>
</section>`
);
export default class FilmDetailsView {
  constructor(film, comments) {
    this.film = film;
    this.comments = comments;
  }

  getTemplate() {
    return createPopupTemplate(this.film, this.comments);
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
