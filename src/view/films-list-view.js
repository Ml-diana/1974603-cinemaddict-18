import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">

        </div>
    </section>
    <section class="films-list films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container top-rated-films"></div>
      </section>
    <section class="films-list films-list--extra">
        <h2 class="films-list__title">Most commented</h2>
        <div class="films-list__container top-rated-films most-commented-films"></div>
    </section>
 </section>
  `);
export default class FilmsListView extends AbstractView {
  get template() {
    return createFilmsListTemplate();
  }

  get filmsListContainerElement() {
    return this.element.querySelector('.films-list__container');
  }

  get filmsListElement() {
    return this.element.querySelector('.films-list');
  }

  get topRatedFilmsContainerElement() {
    return this.element.querySelector('.top-rated-films');
  }

  get mostCommentedFilmsContainerElement() {
    return this.element.querySelector('.most-commented-films');
  }

}
