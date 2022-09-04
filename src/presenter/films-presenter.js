import FilmsListView from '../view/films-list-view.js';
import TopRatedFilmsListView from '../view/top-rated-films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import MostCommentedFilmsListView from '../view/most-commented-films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render, remove} from '../framework/render.js';
import FilmDetailsView from '../view/film-details-view.js';
import NoFilmView from '../view/no-film-view.js';
import {isEscape} from '../utils.js';

const ONE_PART_OF_THE_FILMS = 5;

export default class FilmsPresenter {
  #cinemaContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmDetailsComponent = null;
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

  #renderFilmCard = (film) => {
    const filmCardComponent = new FilmCardView(film);
    render(filmCardComponent, this.#filmListComponent.filmsListContainerElement);
    filmCardComponent.setClickCardHandler(this.#handleCardClickHandler);
  };

  #handleCardClickHandler = (film) => {
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#handleEscKeyDown);
    const comments = [...this.#commentsModel.get(film)];
    this.#filmDetailsComponent = new FilmDetailsView(film, comments);
    this.#filmDetailsComponent.setCloseClickHandler(this.#handleCardDetailsCloseClick);
    document.body.append(this.#filmDetailsComponent.element);
  };

  #handleCardDetailsCloseClick = () => {
    this.#closeFilmDetails();
  };

  #closeFilmDetails = () => {
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#filmDetailsComponent.element.remove();
  };

  #handleEscKeyDown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.#closeFilmDetails();
    }
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

}
