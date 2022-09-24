import NavigationListView from '../view/navigation-list-view.js';
import {filterFilms} from '../utils/filter.js';
import {FilterType} from '../utils/const.js';
import {render, remove, replace} from '../framework/render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;
  #filterComponent = null;
  #currentFilter = FilterType.ALL;
  #navigationListComponent = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  /*get filters() {
     return [
    {
      type: FilterType.ALL,
      name: 'All',
      count: filter[FilterType.ALL](tasks).length,
    },

  }*/

  init = () => {
    const films = this.#filmsModel.films;
    //const filters = this.filters;
    const prevNavigationList = this.#navigationListComponent;
    const filteredFilmsCount = {
      [FilterType.WATCHLIST]: filterFilms(films, FilterType.WATCHLIST).length,
      [FilterType.HISTORY]: filterFilms(films, FilterType.HISTORY).length,
      [FilterType.FAVORITES]: filterFilms(films, FilterType.FAVORITES).length
    };
    this.#navigationListComponent = new NavigationListView(filteredFilmsCount);
    this.#navigationListComponent.setNavigationClickHandler(this.#handleFilterTypeChange);
    if (prevNavigationList === null) {
      render(this.#navigationListComponent, this.#filterContainer);
      return;
    }
    replace(this.#navigationListComponent, prevNavigationList);
    remove(prevNavigationList);
  };

  #handleModelEvent = () => {
    this.init();
  };


  #handleFilterTypeChange = (filterType) => {
    console.log(this.#filterModel.filter);
    //console.log(filterType);
  };
}