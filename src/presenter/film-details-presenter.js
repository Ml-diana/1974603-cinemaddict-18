import FilmDetailsView from '../view/film-details-view.js';
import {isEscape} from '../utils/utils.js';
import {remove} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import {FilmDetailsMode, TimeLimit} from '../utils/const.js';

export default class FilmDetailsPresenter {
  #filmDetailsComponent = null;
  #film = null;
  #filmsModel = null;
  #commentsModel = null;
  #mode = FilmDetailsMode.CLOSED;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  init = (film, commentsModel, filmsModel) => {
    this.#film = film;
    this.#commentsModel = commentsModel;
    this.#filmsModel = filmsModel;
    this.#commentsModel.getFilmComments(this.#film);
    this.#commentsModel.addObserver(this.#handleCommentsModelEvent);
    this.#filmsModel.addObserver(this.#handleFilmModelEvent);
    this.#renderFilmDetails();
  };

  #renderFilmDetails = () => {
    const prevFilmDetailsComponent = this.#filmDetailsComponent;
    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#commentsModel.comments, this.#changeData);
    if (this.#mode === FilmDetailsMode.OPENED) {
      this.#closeFilmDetails();
    }
    this.#initFilmDetailsClickHandlers();
    remove(prevFilmDetailsComponent);
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };

  #initFilmDetailsClickHandlers = () => {
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#filmDetailsComponent.setCloseClickHandler(this.#closeFilmDetails);
    document.body.append(this.#filmDetailsComponent.element);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#watchlistClickHandler);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#watchedClickHandler);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
    this.#filmDetailsComponent.setDeleteCommentHandler(this.#deleteCommentHandler);
    this.#filmDetailsComponent.setAddCommentHandler(this.#addCommentHandler);
    this.#mode = FilmDetailsMode.OPENED;
  };

  #closeFilmDetails = () => {
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#filmDetailsComponent.element.remove();
    this.#commentsModel.removeObserver(this.#handleCommentsModelEvent);
    this.#filmsModel.removeObserver(this.#handleFilmModelEvent);
    this.#mode = FilmDetailsMode.CLOSED;
  };

  #handleEscKeyDown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.#closeFilmDetails();
    }
  };

  #watchlistClickHandler = () => {
    this.#film.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeData({...this.#film});
  };

  #watchedClickHandler = () => {
    this.#film.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeData({...this.#film});
  };

  #favoriteClickHandler = () => {
    this.#film.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#changeData({...this.#film});
  };

  #deleteCommentHandler = (commentId) => {
    try {
      this.#commentsModel.deleteComment('Minor', commentId);
    } catch(err) {
      this.#filmDetailsComponent.shakeComment(commentId);
    }
  };

  #addCommentHandler = (comment) => {
    try {
      this.#commentsModel.addComment('Minor', comment, this.#film);
    } catch(err) {
      this.#filmDetailsComponent.shakeForm();
    }
  };

  #changeData = (film) => {
    this.#filmsModel.updateFilm(film);
  };

  #handleFilmModelEvent = async (updateType, data) => {
    this.#uiBlocker.block();
    try {
      this.#film = data;
      await this.#filmDetailsComponent.updateElement({
        film: data
      });
    } catch(err) {
      this.#filmDetailsComponent.shakeControl();
    }
    this.#uiBlocker.unblock();
  };

  #handleCommentsModelEvent = async (updateType, data) => {
    this.#uiBlocker.block();
    try {
      await this.#filmDetailsComponent.updateElement({
        comments: data
      });
    } catch(err) {
      this.#filmDetailsComponent.shakeForm();
    }
    this.#uiBlocker.unblock();
  };
}
