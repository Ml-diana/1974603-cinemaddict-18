import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {SortingType} from '../utils/const.js';

const createSortButtonTemplate = (currentSortType) => (
  `<ul class="sort">
  <li><a href="#" class="sort__button ${currentSortType === SortingType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SortingType.DEFAULT}">Sort by default</a></li>
  <li><a href="#" class="sort__button ${currentSortType === SortingType.DATE ? 'sort__button--active' : ''}" data-sort-type="${SortingType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button ${currentSortType === SortingType.RATING ? 'sort__button--active' : ''}" data-sort-type="${SortingType.RATING}">Sort by rating</a></li>
</ul>`);

export default class SortButtonView extends AbstractStatefulView {
  _state = {
    sortingType: SortingType.DEFAULT,
  };

  _restoreHandlers = () => {
    this.setSortingClickHandler(this._callback.sortTypeChange);
  };

  get template() {
    return createSortButtonTemplate(this._state.sortingType);
  }

  setSortingType = (sortingType) => {
    this._state = {
      sortingType
    };
    this.updateElement(this._state);
  };

  setSortingClickHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#clickSortingHandler);
  };

  #clickSortingHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    this.element.querySelector('.sort__button--active').classList.remove('sort__button--active');
    evt.target.classList.add('sort__button--active');
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this.setSortingType(evt.target.dataset.sortType);
  };
}
