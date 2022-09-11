import FilmCardView from '../view/film-card-view.js';
import FilmDetailsPresenter from './film-details-presenter.js';
import {render, remove} from '../framework/render.js';


export default class FilmCardPresenter {
  #film = [];
  #filmListComponent = null;
  #changeData = null;
  #commentsModel = null;
  #filmCardComponent = null;
  #filmDetailsPresenter = new Map();

  constructor(filmListComponent, changeData) {
    this.#filmListComponent = filmListComponent;
    this.#changeData = changeData;
  }

  init = (film, commentsModel) => {
    this.#film = film;
    this.#renderFilmCard(this.#film);
    this.#commentsModel = commentsModel;
  };

  #renderFilmCard = (film) => {
    this.#clearFilmDetailsList();
    const prevFilmCardComponent = this.#filmCardComponent;
    this.#filmCardComponent = new FilmCardView(film);
    this.#filmCardComponent.setCardControlsClickHandler(this.#handleCardControlsClickHandler);
    this.#filmCardComponent.setClickCardHandler(this.#renderFilmDetails);
    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmListComponent);
    }
    remove(prevFilmCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  #renderFilmDetails = (film) => {
    const filmDetailsPresenter = new FilmDetailsPresenter(document.body, this.#handleModeChange);
    const comments = [...this.#commentsModel.get(film)];
    filmDetailsPresenter.init(film,comments);
    this.#filmDetailsPresenter.set(film.id, filmDetailsPresenter);
  };

  #handleModeChange = () => {
    this.#filmDetailsPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearFilmDetailsList = () => {
    this.#filmDetailsPresenter.forEach((presenter) => presenter.destroy());
    this.#filmDetailsPresenter.clear();
  };


  #handleCardControlsClickHandler = () => {
  };

}
