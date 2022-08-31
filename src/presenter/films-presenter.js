import FilmsListView from '../view/films-list-view.js';
import TopRatedFilmsListView from '../view/top-rated-films-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import MostCommentedFilmsListView from '../view/most-commented-films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';
import FilmDetailsView from '../view/film-details-view.js';
import NoFilmView from '../view/no-film-view.js';

const ONE_PART_OF_THE_FILMS = 5;
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
    this.#renderMovieSite();
  };


  #renderFilmCard = (film) => {
    const filmCardComponent = new FilmCardView(film);
    render(filmCardComponent, this.#filmListComponent.filmsListContainerElement);
    render(this.#topRatedFilmsListComponent, this.#filmListComponent.element);
    render(this.#mostCommentedFilmsListComponent, this.#filmListComponent.element);

  };

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + ONE_PART_OF_THE_FILMS)
      .forEach((film) => this.#renderFilmCard(film));

    this.#renderedFilmCount += ONE_PART_OF_THE_FILMS;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }

  };

  #renderFilmDetails = (film, comments) => {
    const filmDetailsComponent = new FilmDetailsView(film, comments);

    const closeFilmDetails = () => {
      filmDetailsComponent.element.remove();
      document.body.classList.remove('hide-overflow');

    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeFilmDetails();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const openFilmDetails = () => {
      document.body.append(filmDetailsComponent.element);
      document.body.classList.add('hide-overflow');

      document.addEventListener('keydown', onEscKeyDown);
      filmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
        closeFilmDetails();
      });
    };

    const filmCards = document.querySelectorAll('.film-card');

    for (const card of filmCards) {
      card.addEventListener('click', () => {
        openFilmDetails();
      });
    }

  };

  #renderMovieSite = () => {
    render(this.#filmListComponent, this.#cinemaContainer);

    if (this.#films.length === 0) {
      return render(new NoFilmView, this.#filmListComponent.filmsListContainerElement);
    }

    for (let i = 0; i < Math.min(this.#films.length, ONE_PART_OF_THE_FILMS); i++) {
      this.#renderFilmCard(this.#films[i]);
    }
    const comments = [...this.#commentsModel.get(this.#films[0])];
    this.#renderFilmDetails(this.#films[0], comments);

    if (this.#films.length > ONE_PART_OF_THE_FILMS) {
      render(this.#showMoreButtonComponent, this.#filmListComponent.filmsListElement);
      this.#showMoreButtonComponent.element.addEventListener('click', this.#handleShowMoreButtonClick);
    }
  };
}
