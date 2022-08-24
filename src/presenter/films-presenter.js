import FilmsListView from '../view/films-list-view.js';
import TopRatedFilmsListView from '../view/top-rated-films-list.js';
import FilmCardView from '../view/fim-card-view.js';
import MostCommentedFilmsListView from '../view/most-commented-films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import {render} from '../render.js';
import FilmDetailsView from '../view/film-details-view.js';
//import FilmDetailsView from '../view/film-details-view.js';

export default class FilmsPresenter {
  #cinemaContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = [];
  #filmListComponent = new FilmsListView();
  #showMoreButtonView = new ShowMoreButtonView();
  #topRatedFilmsListView = new TopRatedFilmsListView();
  #mostCommentedFilmsListView = new MostCommentedFilmsListView();


  init = (cinemaContainer, filmsModel, commentsModel) => {
    this.#cinemaContainer = cinemaContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#films = [...filmsModel.films];

    const comments = [...this.#commentsModel.get(this.#films[0])];
    render(this.#filmListComponent, this.#cinemaContainer);
    render(this.#topRatedFilmsListView, this.#filmListComponent.element);
    render(this.#mostCommentedFilmsListView, this.#filmListComponent.element);
    for (let i = 0; i < this.#films.length; i++) {
      render(new FilmCardView(this.#films[i]), this.#filmListComponent.filmsListContainerElement);
    }
    this.#renderFilmDetails(this.#films[0], comments);
    render(this.#showMoreButtonView, this.#filmListComponent.filmsListElement);
  };

  #renderFilmDetails = (film, comments) => {
    const filmDetailsComponent = new FilmDetailsView(film, comments);


    const closeFilmDetails = () => {
      document.body.removeChild(filmDetailsComponent.element);
      filmDetailsComponent.element.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeFilmDetails();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const openFilmDetails = () => {
      document.body.appendChild(filmDetailsComponent.element);
      filmDetailsComponent.element.classList.add('hide-overflow');
      document.addEventListener('keydown', onEscKeyDown);
      filmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
        closeFilmDetails();
      });
    };

    const filmCard = document.querySelectorAll('.film-card');
    for (const card of filmCard) {
      card.addEventListener('click', () => {
        openFilmDetails();
      });
    }

  };
}

