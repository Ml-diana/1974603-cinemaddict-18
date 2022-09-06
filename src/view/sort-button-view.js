import AbstractView from '../framework/view/abstract-view.js';

const createSortButtonTemplate = () => (
  `<ul class="sort">
  <li><a href="#" class="sort__button sort__button--active" data-sorting-type="sort-by-default">Sort by default</a></li>
  <li><a href="#" class="sort__button" data-sorting-type="sort-by-date">Sort by date</a></li>
  <li><a href="#" class="sort__button" data-sorting-type="sort-by-rating">Sort by rating</a></li>
</ul>`);

export default class SortButtonView extends AbstractView {

  get template() {
    return createSortButtonTemplate();
  }

  setSortingClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickSortingHandler);
  };

  #clickSortingHandler = (evt) => {
    if (evt.target.dataset.sortingType) {
      this._callback.click(evt.target.dataset.sortingType);
    }
  };
}
