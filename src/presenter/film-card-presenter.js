import FilmCardView from '../view/film-card-view.js';
import {render, remove, replace} from '../framework/render.js';


export default class FilmCardPresenter {
  #film = null;
  #filmListComponent = null;
  #filmsModel = null;
  #changeData = null;
  #commentsModel = null;
  #filmCardComponent = null;
  #filmDetailsPresenter = null;

  constructor(filmListComponent, filmDetailsPresenter, changeData, filmsModel) {
    this.#filmListComponent = filmListComponent;
    this.#filmDetailsPresenter = filmDetailsPresenter;
    this.#changeData = changeData;
    this.#filmsModel = filmsModel;
  }

  init = (film, commentsModel) => {
    this.#film = film;
    this.#renderFilmCard(this.#film);
    this.#commentsModel = commentsModel;
  };

  #renderFilmCard = (film) => {
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
    //this.#clearFilmDetailsList();
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  };

  #renderFilmDetails = (film) => {
    this.#filmDetailsPresenter.init(film,this.#commentsModel, this.#filmsModel);
  };

  #handleAddToWatchlistClickHandler = () => {
    this.#changeData({...this.#film, watchlist: !this.#film.filmInfo.userDetails.watchlist});
  };


  #handleAlreadyWatchedClickHandler = () => {
    this.#changeData({...this.#film, alreadyWatched: !this.#film.filmInfo.userDetails.alreadyWatched});
  };

  #handleAddToFavoritesClickHandler = () => {
    this.#changeData({...this.#film, favorite: !this.#film.filmInfo.userDetails.favorite});
  };


}
