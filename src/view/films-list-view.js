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
  getTemplate() {
    return createFilmsListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());//extra
    }

    return this.element;
  }

  getFilmsListContainerElement() {
    return this.getElement().querySelector('.films-list__container');//фильмы
  }

  getFilmsListElement() {
    return this.getElement().querySelector('.films-list'); //show more button
  }

  removeElement() {
    this.element = null;
  }
}
