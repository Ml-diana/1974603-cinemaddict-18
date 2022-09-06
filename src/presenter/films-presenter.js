import FilmsListView from '../view/films-list-view.js';
import TopRatedFilmsListView from '../view/top-rated-films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import MostCommentedFilmsListView from '../view/most-commented-films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render, remove} from '../framework/render.js';
import NoFilmView from '../view/no-film-view.js';
import NavigationListView from '../view/navigation-list-view.js';
import FilmDetailsPresenter from './film-details-presenter.js';
import SortButtonView from '../view/sort-button-view.js';

const ONE_PART_OF_THE_FILMS = 5;
const siteMainElement = document.querySelector('.main');
/*const filterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY:'history',
  FAVORITES:'favorites'
};
*/
export default class FilmsPresenter {
  #cinemaContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];
  #renderedFilmCount = ONE_PART_OF_THE_FILMS;
  #filmListComponent = new FilmsListView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #topRatedFilmsListComponent = new TopRatedFilmsListView();
  #mostCommentedFilmsListComponent = new MostCommentedFilmsListView();


  constructor(cinemaContainer, filmsModel, commentsModel) {
    this.#cinemaContainer = cinemaContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#renderFilms();
  };

  #renderFilms = () => {
    this.#renderNavigationList();
    this.#renderSortingList();
    render(this.#filmListComponent, this.#cinemaContainer);

    if (this.#films.length === 0) {
      return render(new NoFilmView, this.#filmListComponent.filmsListContainerElement);
    }

    for (let i = 0; i < Math.min(this.#films.length, this.#renderedFilmCount); i++) {
      this.#renderFilmCard(this.#films[i]);
    }
    render(this.#topRatedFilmsListComponent, this.#filmListComponent.element);
    render(this.#mostCommentedFilmsListComponent, this.#filmListComponent.element);

    if (this.#films.length > ONE_PART_OF_THE_FILMS) {
      render(this.#showMoreButtonComponent, this.#filmListComponent.filmsListElement);
      this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    }

  };

  #renderNavigationList = () => {
    const navigationList = new NavigationListView();
    render(navigationList, siteMainElement);
    navigationList.setNavigationClickHandler(this.#handleFiltersClickHandler);
  };

  #renderSortingList = () => {
    const sortButton = new SortButtonView();
    render(sortButton, siteMainElement);
    sortButton.setSortingClickHandler(this.#handleSortingButtonClickHandler);
  };

  #renderFilmCard = (film) => {
    const filmCardComponent = new FilmCardView(film);
    render(filmCardComponent, this.#filmListComponent.filmsListContainerElement);
    filmCardComponent.setCardControlsClickHandler(this.#handleCardControlsClickHandler);
    filmCardComponent.setClickCardHandler(this.#renderFilmDetails);
  };

  #renderFilmDetails = (film) => {
    const filmDetailsPresenter = new FilmDetailsPresenter(document.body);
    const comments = [...this.#commentsModel.get(film)];
    filmDetailsPresenter.init(film,comments);
  };


  #handleShowMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + ONE_PART_OF_THE_FILMS)
      .forEach(this.#renderFilmCard);

    this.#renderedFilmCount += ONE_PART_OF_THE_FILMS;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #handleFiltersClickHandler = (filter) => {
    switch (filter) {
      case ('all'):
    }
    switch (filter) {
      case ('watchlist'):
    }
    switch (filter) {
      case ('history'):
    }
    switch (filter) {
      case ('favorites'):
    }
  };

  #handleSortingButtonClickHandler = (sortingType) => {
    switch (sortingType) {
      case ('sort-by-default'):
    }
    switch (sortingType) {
      case ('sort-by-date'):
    }
    switch (sortingType) {
      case ('sort-by-rating'):
    }
  };


  #handleCardControlsClickHandler = (cardControls) => {
    switch (cardControls) {
      case ('add-to-watchlist'):
    }
    switch (cardControls) {
      case ('mark-as-watched'):
    }
    switch (cardControls) {
      case ('favorite'):
    }
  };
}
