import FilmCardView from '../view/film-card-view.js';
import {render, remove, replace} from '../framework/render.js';


export default class FilmCardPresenter {
  #film = null;
  #filmListComponent = null;
  #filmsModel = null;
  #commentsModel = null;
  #filmCardComponent = null;
  #filmDetailsPresenter = null;

  constructor(filmListComponent, filmDetailsPresenter, filmsModel, commentsModel) {
    this.#filmListComponent = filmListComponent;
    this.#filmDetailsPresenter = filmDetailsPresenter;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = (film) => {
    this.#film = film;
    this.#renderFilmCard(this.#film);
  };

  #renderFilmCard = (film) => {
    const prevFilmCardComponent = this.#filmCardComponent;
    this.#filmCardComponent = new FilmCardView(film);
    this.#filmCardComponent.setAddToWatchlistClickHandler(this.#addToWatchlistClickHandler);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#alreadyWatchedClickHandler);
    this.#filmCardComponent.setAddToFavoritesClickHandler(this.#addToFavoritesClickHandler);
    this.#filmCardComponent.setClickCardHandler(this.#renderFilmDetails);
    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmListComponent);
      return;
    }
    replace(this.#filmCardComponent, prevFilmCardComponent);
    remove(prevFilmCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  #renderFilmDetails = (film) => {
    this.#filmDetailsPresenter.init(film,this.#commentsModel, this.#filmsModel);
  };

  #changeData = (film) => {
    this.#filmsModel.updateFilm(film);
  };

  #addToWatchlistClickHandler = () => {
    this.#film.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeData({...this.#film});
  };


  #alreadyWatchedClickHandler = () => {
    this.#film.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeData({...this.#film});
  };

  #addToFavoritesClickHandler = () => {
    this.#film.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#changeData({...this.#film});
  };
}
