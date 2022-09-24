
import FilmDetailsView from '../view/film-details-view.js';
import {isEscape} from '../utils/utils.js';
import {remove} from '../framework/render.js';
import {UserAction} from '../utils/const.js';

const filmDetailsMode = {
  OPENED: 'OPENED',
  CLOSED: 'CLOSED'
};

export default class FilmDetailsPresenter {
  #filmDetailsComponent = null;
  #film = null;
  #filmsModel = null;
  #commentsModel = null;
  #mode = filmDetailsMode.CLOSED;

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
    this.#filmDetailsComponent.setFavoritesClickHandler(this.#handleFavoriteClickHandler);
    this.#mode = filmDetailsMode.OPENED;
    this.#filmDetailsComponent.setDeleteCommentHandler(this.#deleteCommentHandler);
    this.#filmDetailsComponent.setAddCommentHandler(this.#addCommentHandler);
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
    this.#film.filmInfo.userDetails.watchlist = !this.#film.filmInfo.userDetails.watchlist;
    this.#changeData({ ...this.#film });
  };

  #handleWatchedClickHandler = () => {
    this.#changeData({...this.#film, alreadyWatched: !this.#film.filmInfo.userDetails.alreadyWatched});
  };

  #handleFavoriteClickHandler = () => {
    this.#changeData({...this.#film, favorite: !this.#film.filmInfo.userDetails.favorite});
  };

  #deleteCommentHandler = (commentId) => {
    this.#commentsModel.deleteComment('Minor', commentId);
  };

  #addCommentHandler = (comment) => {
    this.#commentsModel.addComment('Minor', comment);
  };

  #changeData = (film) => {
    this.#filmsModel.updateFilm(film);
  };

  #handleViewAction = (actionType, updateType, update) => {
    //console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_COMMENT:
        this.#commentsModel.updateComment(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
    }
  };

  #handleFilmModelEvent = (updateType, data) => {
    this.#film = data;
    this.#renderFilmDetails();
  };

  #handleCommentsModelEvent = () => {
    this.#renderFilmDetails();
  };

/*
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        //this.#taskPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };*/
}
