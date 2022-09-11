import FilmsListView from '../view/films-list-view.js';
import TopRatedFilmsListView from '../view/top-rated-films-list-view.js';
import MostCommentedFilmsListView from '../view/most-commented-films-list-view.js';
import {render, remove, replace} from '../framework/render.js';
import NoFilmView from '../view/no-film-view.js';
import NavigationListView from '../view/navigation-list-view.js';
import SortButtonView from '../view/sort-button-view.js';
import {ONE_PART_OF_THE_FILMS} from '../mock/const.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import {updateItem} from '../utils/utils.js';
import {filterFilm} from '../utils/filter.js';
import {FilterType} from '../utils/const.js';


const siteMainElement = document.querySelector('.main');

export default class FilmsPresenter {
  #cinemaContainer = null;
  #filmsModel = null;
  #navigationListComponent = null;
  #commentsModel = null;
  #changeData = null;
  #films = [];
  #filmListComponent = new FilmsListView();
  #topRatedFilmsListComponent = new TopRatedFilmsListView();
  #mostCommentedFilmsListComponent = new MostCommentedFilmsListView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #renderedFilmCount = ONE_PART_OF_THE_FILMS;
  #currentFilter = FilterType.ALL;
  #filmCardPresenter = new Map();


  constructor(cinemaContainer, filmsModel, commentsModel) {
    this.#cinemaContainer = cinemaContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#renderNavigationList();
    this.#renderSortingList();
    render(this.#filmListComponent, this.#cinemaContainer);
    this.#renderFilms(this.#films);
    render(this.#topRatedFilmsListComponent, this.#filmListComponent.element);
    render(this.#mostCommentedFilmsListComponent, this.#filmListComponent.element);
  };

  #renderFilms = (films) => {
    if (films.length === 0) {
      render(new NoFilmView, this.#filmListComponent.filmsListContainerElement);
    }
    if (films.length > ONE_PART_OF_THE_FILMS) {
      render(this.#showMoreButtonComponent, this.#filmListComponent.filmsListElement);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }
    for (let i = 0; i < Math.min(films.length, this.#renderedFilmCount); i++) {
      const filmCardPresenter = new FilmCardPresenter(this.#filmListComponent.filmsListContainerElement, this.#handleFilmChange);
      filmCardPresenter.init(films[i], this.#commentsModel);
      this.#filmCardPresenter.set(films[i].id, filmCardPresenter);
    }
  };

  #clearFilmList = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();
    this.#renderedFilmCount = ONE_PART_OF_THE_FILMS;
    remove(this.#showMoreButtonComponent);
  };

  #renderNavigationList = () => {
    const prevNavigationList = this.#navigationListComponent;
    this.#navigationListComponent = new NavigationListView();
    this.#navigationListComponent.setNavigationClickHandler(this.#handleFilterTypeChange);

    if (prevNavigationList === null) {
      render(this.#navigationListComponent, siteMainElement);
      return;
    }
    replace(this.#navigationListComponent, prevNavigationList);
    remove(prevNavigationList);

  };

  #renderSortingList = () => {
    const sortButton = new SortButtonView();
    render(sortButton, siteMainElement);
    //sortButton.setSortingClickHandler(this.#handleSortingButtonClickHandler);
  };

  #handleShowMoreButtonClick = (films) => {
    films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + ONE_PART_OF_THE_FILMS)
      .forEach((film) => this.#renderFilms(film));

    this.#renderedFilmCount += ONE_PART_OF_THE_FILMS;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#filmCardPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #handleFilterTypeChange = () => {
    //фильтрация
    this.#clearFilmList();
    const filteredFilms = filterFilm(this.#films, this.#currentFilter);
    this.#renderFilms(filteredFilms);
  };

}
