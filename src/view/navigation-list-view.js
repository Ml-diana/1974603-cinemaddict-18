import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../utils/const.js';

const createNavigationListTemplate = () => (
  `<nav class="main-navigation">
<a href="#all" class="main-navigation__item main-navigation__item--active" data-filter-type="${FilterType.ALL}">All movies</a>
<a href="#watchlist" class="main-navigation__item" data-filter-type="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">13</span></a>
<a href="#history" class="main-navigation__item" data-filter-type="${FilterType.HISTORY}">History <span class="main-navigation__item-count">4</span></a>
<a href="#favorites" class="main-navigation__item" data-filter-type="${FilterType.FAVORITES}">Favorites <span class="main-navigation__item-count">8</span></a>
</nav>`);

export default class NavigationListView extends AbstractView {

  get template() {
    return createNavigationListTemplate();
  }

  setNavigationClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickNavigationHandler);
  };

  #clickNavigationHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    if (evt.target.dataset.filterType) {
      this._callback.click(evt.target.dataset.filterType);
    }
  };
}
