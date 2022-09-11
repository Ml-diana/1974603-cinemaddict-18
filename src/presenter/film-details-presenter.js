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
  #changeMode = null;
  #mode = filmDetailsMode.CLOSED;

  constructor(changeMode){
    this.#changeMode = changeMode;
  }

  init = (film,comments) => {
    this.#film = film;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.#filmDetailsComponent = new FilmDetailsView (film, comments);
    if (this.#mode === filmDetailsMode.CLOSED) {
      this.#handleCardClickHandler();
    }
    if (this.#mode === filmDetailsMode.OPENED) {
      this.#closeFilmDetails();
    }
    remove(prevFilmDetailsComponent);
  };

  resetView = () => {
    if (this.#mode !== filmDetailsMode.CLOSED) {
      this.#handleCardClickHandler();
    }
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };

  #handleCardClickHandler = () => {
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#filmDetailsComponent.setCloseClickHandler(this.#handleCardDetailsCloseClick);
    document.body.append(this.#filmDetailsComponent.element);
    this.#filmDetailsComponent.setClickControlHandler(this.#handleControlClickHandler);
    this.#changeMode();
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

  #handleControlClickHandler = (btnType) => {
    switch (btnType) {
      case ('watchlist'):
    }
    switch (btnType) {
      case ('watched'):
    }
    switch (btnType) {
      case ('favorite'):
    }
  };
}
