import FilmsListView from '../view/films-list-view.js';
import TopRatedFilmsListView from '../view/top-rated-films-list-view.js';
import MostCommentedFilmsListView from '../view/most-commented-films-list-view.js';
import {render, remove} from '../framework/render.js';
import NoFilmView from '../view/no-film-view.js';
import SortButtonView from '../view/sort-button-view.js';
import {ONE_PART_OF_THE_FILMS} from '../mock/const.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import {sortByDate, sortByRating} from '../utils/utils.js';
import {SortingType} from '../utils/const.js';
import FilmDetailsPresenter from './film-details-presenter.js';
import FilterPresenter from './filter-presenter.js';
import {filterFilms} from '../utils/filter.js';


const siteMainElement = document.querySelector('.main');

export default class FilmsPresenter {
  #cinemaContainer = null;
  #filmsModel = null;
  #noFilmComponent = null;
  #commentsModel = null;
  #filterModel = null;
  #filmListComponent = new FilmsListView();
  #filmDetailsPresenter = new FilmDetailsPresenter();
  #topRatedFilmsListComponent = new TopRatedFilmsListView();
  #mostCommentedFilmsListComponent = new MostCommentedFilmsListView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #sortButtonComponent = new SortButtonView();
  #renderedFilmCount = ONE_PART_OF_THE_FILMS;
  #currentSortType = SortingType.DEFAULT;
  #filmCardPresenters = new Map();


  constructor(cinemaContainer, filmsModel, commentsModel, filterModel) {
    this.#cinemaContainer = cinemaContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#filmsModel.addObserver(this.#handleModalEvent);
    this.#filterModel.addObserver(this.#handleModalEvent);
  }

  get films () {
    const films = filterFilms(this.#filmsModel.films, this.#filterModel.filter);
    switch (this.#currentSortType) {
      case SortingType.DATE:
        return films.sort(sortByDate);
      case SortingType.RATING:
        return films.sort(sortByRating);
    }
    return films;
  }

  init = () => {
    this.#renderNavigationList();
    this.#renderSortingList();
    render(this.#filmListComponent, this.#cinemaContainer);
    this.#renderFilms();
    render(this.#topRatedFilmsListComponent, this.#filmListComponent.element);
    render(this.#mostCommentedFilmsListComponent, this.#filmListComponent.element);
  };

  #renderFilms = () => {
    const films = this.films;
    if (films.length === 0) {
      this.#renderNoFilms();
      remove(this.#topRatedFilmsListComponent);
      remove(this.#mostCommentedFilmsListComponent);
      return;
    }
    if (films.length > ONE_PART_OF_THE_FILMS) {
      render(this.#showMoreButtonComponent, this.#filmListComponent.filmsListElement);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }
    for (let i = 0; i < Math.min(films.length, this.#renderedFilmCount); i++) {
      this.#renderFilm(films[i]);
    }
  };

  #renderFilm = (film) => {
    const filmCardPresenter = new FilmCardPresenter(this.#filmListComponent.filmsListContainerElement, this.#filmDetailsPresenter, this.#filmsModel, this.#commentsModel);
    filmCardPresenter.init(film);
    this.#filmCardPresenters.set(film.id, filmCardPresenter);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#filmCardPresenters.get(updatedFilm.id).init(updatedFilm, this.#commentsModel.comments);
  };

  #clearFilmList = () => {
    this.#filmCardPresenters.forEach((presenter) => presenter.destroy());
    this.#currentSortType = SortingType.DEFAULT;
    this.#sortButtonComponent.setSortingType(this.#currentSortType);
    this.#renderedFilmCount = ONE_PART_OF_THE_FILMS;
    remove(this.#showMoreButtonComponent);
    if (this.#noFilmComponent) {
      remove(this.#noFilmComponent);
    }
  };

  #renderNavigationList = () => {
    const filterPresenter = new FilterPresenter(siteMainElement, this.#filterModel, this.#filmsModel);
    filterPresenter.init();
  };

  #renderSortingList = () => {
    render(this.#sortButtonComponent, siteMainElement);
    this.#sortButtonComponent.setSortingClickHandler(this.#handleSortingButtonClick);
  };

  #renderNoFilms = () => {
    this.#noFilmComponent = new NoFilmView( this.#filterModel.filter);
    render(this.#noFilmComponent, this.#filmListComponent.filmsListContainerElement);
  };


  #handleShowMoreButtonClick = () => {
    const films = this.films.slice(this.#renderedFilmCount, this.#renderedFilmCount + ONE_PART_OF_THE_FILMS);
    films.forEach(this.#renderFilm);

    this.#renderedFilmCount += ONE_PART_OF_THE_FILMS;

    if (this.#renderedFilmCount >= this.films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleSortingButtonClick = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#clearFilmList();
    this.#currentSortType = sortType;
    this.#renderFilms();
  };

  #handleModalEvent = (updateType, data) => {
    switch (updateType) {
      case 'Minor':
        this.#handleFilmChange(data);
        break;
      case 'Major':
        this.#clearFilmList();
        this.#renderFilms();
    }
  };
}
