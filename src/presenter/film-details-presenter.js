
import FilmDetailsView from '../view/film-details-view.js';
import {isEscape} from '../utils/utils.js';
import {remove} from '../framework/render.js';

const filmDetailsMode = {
  OPENED: 'OPENED',
  CLOSED: 'CLOSED'
};

export default class FilmDetailsPresenter {
  #filmDetailsComponent = null;
  #film = null;
  #changeData = null;
  #mode = filmDetailsMode.CLOSED;

  init = (film, comments) => {
    this.#film = film;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.#filmDetailsComponent = new FilmDetailsView (film, comments, this.#changeData);

    if (this.#mode === filmDetailsMode.OPENED) {
      this.#closeFilmDetails();
    }
    this.#handleCardClickHandler();
    remove(prevFilmDetailsComponent);
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };

  #handleCardClickHandler = () => {
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#filmDetailsComponent.setCloseClickHandler(this.#handleCardDetailsCloseClick);
    document.body.append(this.#filmDetailsComponent.element);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#handleWatchlistClickHandler);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#handleWatchedClickHandler);
    this.#filmDetailsComponent.setFavoritesClickHandler(this.#handleFavotiteClickHandler);
    this.#mode = filmDetailsMode.OPENED;
  };

  #handleCardDetailsCloseClick = () => {
    this.#closeFilmDetails();
    this.#mode = filmDetailsMode.CLOSED;
  };

  #closeFilmDetails = () => {
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#filmDetailsComponent.element.remove();
    this.#mode = filmDetailsMode.CLOSED;
  };

  #handleEscKeyDown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.#closeFilmDetails();
    }
  };

  #handleWatchlistClickHandler = () => {
    this.#changeData({...this.#film, watchlist: !this.#film.filmInfo.userDetails.watchlist});
  };

  #handleWatchedClickHandler = () => {
    this.#changeData({...this.#film, alreadyWatched: !this.#film.filmInfo.userDetails.alreadyWatched});
  };

  #handleFavotiteClickHandler = () => {
    this.#changeData({...this.#film, favorite: !this.#film.filmInfo.userDetails.favorite});
  };

}
