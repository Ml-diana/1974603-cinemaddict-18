import {createElement} from '../render.js';

const createFilmsListTemplate = () => (
  `<section class="films">
  <section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  <div class="films-list__container">

  </div>
  </section>
  </section>
  `);
export default class FilmsListView {
  #element = null;
  get template() {
    return createFilmsListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get filmsListContainerElement() {
    return this.#element.querySelector('.films-list__container');
  }

  get filmsListElement() {
    return this.#element.querySelector('.films-list');
  }

  removeElement() {
    this.#element = null;
  }
}
