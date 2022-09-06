import FilmDetailsView from '../view/film-details-view.js';
import {isEscape} from '../utils.js';

export default class FilmDetailsPresenter {
  #filmDetailsComponent = null;
  #film = null;

  init = (film,comments) => {
    this.#film = film;
    this.#filmDetailsComponent = new FilmDetailsView (film, comments);
    this.#handleCardClickHandler();
  };

  #handleCardClickHandler = () => {
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#filmDetailsComponent.setCloseClickHandler(this.#handleCardDetailsCloseClick);
    document.body.append(this.#filmDetailsComponent.element);
    this.#filmDetailsComponent.setClickControlHandler(this.#handleControlClickHandler);
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
