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
import {updateItem, sortByDate, sortByRating} from '../utils/utils.js';
import {filteredFilms} from '../utils/filter.js';
import {FilterType, SortingType} from '../utils/const.js';
import FilmDetailsPresenter from './film-details-presenter.js';

const siteMainElement = document.querySelector('.main');

export default class FilmsPresenter {
  #cinemaContainer = null;
  #filmsModel = null;
  #navigationListComponent = null;
  #noFilmComponent = null;
  #commentsModel = null;
  #films = [];
  #sourcedFilms = [];
  #filmListComponent = new FilmsListView();
  #filmDetailsPresenter = new FilmDetailsPresenter();
  #topRatedFilmsListComponent = new TopRatedFilmsListView();
  #mostCommentedFilmsListComponent = new MostCommentedFilmsListView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #sortButtonComponent = new SortButtonView();
  #renderedFilmCount = ONE_PART_OF_THE_FILMS;
  #currentFilter = FilterType.ALL;
  #currentSortType = SortingType.DEFAULT;
  #filmCardPresenters = new Map();


  constructor(cinemaContainer, filmsModel, commentsModel) {
    this.#cinemaContainer = cinemaContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#renderNavigationList();
    this.#renderSortingList();
    render(this.#filmListComponent, this.#cinemaContainer);
    this.#renderFilms(this.#films);
    render(this.#topRatedFilmsListComponent, this.#filmListComponent.element);
    render(this.#mostCommentedFilmsListComponent, this.#filmListComponent.element);
  };

  #renderFilms = () => {
    this.#films = filteredFilms([...this.#filmsModel.films], this.#currentFilter);
    this.#sourcedFilms = this.#filmsModel.films;
    if (this.#films.length === 0) {
      this.#noFilmComponent = new NoFilmView();
      render(this.#noFilmComponent, this.#filmListComponent.filmsListContainerElement);
      remove(this.#topRatedFilmsListComponent);
      remove(this.#mostCommentedFilmsListComponent);
      return;
    }
    if (this.#films.length > ONE_PART_OF_THE_FILMS) {
      render(this.#showMoreButtonComponent, this.#filmListComponent.filmsListElement);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }
    for (let i = 0; i < Math.min(this.#films.length, this.#renderedFilmCount); i++) {
      this.#renderFilm(this.#films[i]);
    }
  };

  #renderSortFilms = () => {
    if (this.#films.length === 0) {
      this.#noFilmComponent = new NoFilmView();
      render(this.#noFilmComponent, this.#filmListComponent.filmsListContainerElement);
      remove(this.#topRatedFilmsListComponent);
      remove(this.#mostCommentedFilmsListComponent);
      return;
    }
    if (this.#films.length > ONE_PART_OF_THE_FILMS) {
      render(this.#showMoreButtonComponent, this.#filmListComponent.filmsListElement);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }
    for (let i = 0; i < Math.min(this.#films.length, this.#renderedFilmCount); i++) {
      this.#renderFilm(this.#films[i]);
    }
  };

  #renderFilm = (film) => {
    const filmCardPresenter = new FilmCardPresenter(this.#filmListComponent.filmsListContainerElement, this.#filmDetailsPresenter, this.#handleFilmChange);
    filmCardPresenter.init(film, this.#commentsModel);
    this.#filmCardPresenters.set(film.id, filmCardPresenter);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#filmCardPresenters.get(updatedFilm.id).init(updatedFilm, this.#commentsModel);
    //this.#renderFilm(updatedFilm);
  };

  #clearFilmList = () => {
    this.#filmCardPresenters.forEach((presenter) => presenter.destroy());
    this.#renderedFilmCount = ONE_PART_OF_THE_FILMS;
    remove(this.#showMoreButtonComponent);
  };

  #renderNavigationList = () => {
    const prevNavigationList = this.#navigationListComponent;
    const films = this.#filmsModel.films;
    const filteredFilmsCount = {
      [FilterType.WATCHLIST]: filteredFilms(films, FilterType.WATCHLIST).length,
      [FilterType.HISTORY]: filteredFilms(films, FilterType.HISTORY).length,
      [FilterType.FAVORITES]: filteredFilms(films, FilterType.FAVORITES).length
    };
    this.#navigationListComponent = new NavigationListView(filteredFilmsCount);
    this.#navigationListComponent.setNavigationClickHandler(this.#handleFilterTypeChange);

    if (prevNavigationList === null) {
      render(this.#navigationListComponent, siteMainElement);
      return;
    }
    replace(this.#navigationListComponent, prevNavigationList);
    remove(prevNavigationList);
  };

  #renderSortingList = () => {
    render(this.#sortButtonComponent, siteMainElement);
    this.#sortButtonComponent.setSortingClickHandler(this.#handleSortingButtonClickHandler);
  };

  #handleShowMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + ONE_PART_OF_THE_FILMS)
      .forEach(this.#renderFilm);

    this.#renderedFilmCount += ONE_PART_OF_THE_FILMS;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleFilterTypeChange = (filterType) => {
    this.#clearFilmList();
    this.#currentFilter = filterType;
    this.#renderFilms();
  };

  #handleSortingButtonClickHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#clearFilmList();
    this.#sortFilms(sortType);
    this.#renderSortFilms();
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortingType.DATE:
        this.#films.sort(sortByDate);
        break;
      case SortingType.RATING:
        this.#films.sort(sortByRating);
        break;
      default:
        this.#films = [...this.#sourcedFilms];
    }
    this.#currentSortType = sortType;
  };


}
