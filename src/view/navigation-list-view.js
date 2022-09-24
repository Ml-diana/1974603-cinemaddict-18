import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../utils/const.js';

const createNavigationListTemplate = (filteredFilmsCount) => (
  `<nav class="main-navigation">
<a href="#all" class="main-navigation__item main-navigation__item--active" data-filter-type="${FilterType.ALL}">All movies</a>
<a href="#watchlist" class="main-navigation__item" data-filter-type="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${filteredFilmsCount[FilterType.WATCHLIST]}</span></a>
<a href="#history" class="main-navigation__item" data-filter-type="${FilterType.HISTORY}">History <span class="main-navigation__item-count">${filteredFilmsCount[FilterType.HISTORY]}</span></a>
<a href="#favorites" class="main-navigation__item" data-filter-type="${FilterType.FAVORITES}">Favorites <span class="main-navigation__item-count">${filteredFilmsCount[FilterType.FAVORITES]}</span></a>
</nav>`);

export default class NavigationListView extends AbstractView {
  #filteredFilmsCount = null;
  #currentFilter = null;

  constructor(filteredFilmsCount, currentFilter){
    super();
    this.#filteredFilmsCount = filteredFilmsCount;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createNavigationListTemplate(this.#filteredFilmsCount, this.#currentFilter);
  }

  setNavigationClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickNavigationHandler);
  };

  #clickNavigationHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt.target.dataset.filterType);
  };
}
