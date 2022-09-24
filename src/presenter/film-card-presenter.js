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
    const prevFilmCardComponent = this.#filmCardComponent;
    this.#filmCardComponent = new FilmCardView(film);
    this.#filmCardComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClickHandler);
    this.#filmCardComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClickHandler);
    this.#filmCardComponent.setAddToFavoritesClickHandler(this.#handleAddToFavoritesClickHandler);
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

  #handleAddToWatchlistClickHandler = () => {
    this.#film.filmInfo.userDetails.watchlist = !this.#film.filmInfo.userDetails.watchlist;
    this.#changeData({...this.#film });
  };

  #handleAlreadyWatchedClickHandler = () => {
    this.#changeData({...this.#film, alreadyWatched: !this.#film.filmInfo.userDetails.alreadyWatched});
  };

  #handleAddToFavoritesClickHandler = () => {
    this.#changeData({...this.#film, favorite: !this.#film.filmInfo.userDetails.favorite});
  };
}
