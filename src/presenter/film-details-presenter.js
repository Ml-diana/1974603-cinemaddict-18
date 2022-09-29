
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
    //const comments = [...this.#commentsModel.get(this.#film)];
    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#commentsModel.comments, this.#changeData);
    //console.log(comments);

    if (this.#mode === filmDetailsMode.OPENED) {
      this.#closeFilmDetails();
    }
    this.#initCardDetailsHandlers();
    remove(prevFilmDetailsComponent);
  };

  destroy = () => {
    remove(this.#filmDetailsComponent);
  };

  #initCardDetailsHandlers = () => {
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#filmDetailsComponent.setCloseClickHandler(this.#handleCardDetailsCloseClick);
    document.body.append(this.#filmDetailsComponent.element);
    this.#filmDetailsComponent.setWatchlistClickHandler(this.#watchlistClickHandler);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#watchedClickHandler);
    this.#filmDetailsComponent.setFavoritesClickHandler(this.#favotiteClickHandler);
    this.#mode = filmDetailsMode.OPENED;
    this.#filmDetailsComponent.setDeleteCommentHandler(this.#deleteCommentHandler);
    this.#filmDetailsComponent.setAddCommentHandler(this.#addCommentHandler);
  };

  #handleCardDetailsCloseClick = () => {
    this.#closeFilmDetails();
  };

  #closeFilmDetails = () => {
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#filmDetailsComponent.element.remove();
    this.#commentsModel.removeObserver(this.#handleCommentsModelEvent);
    this.#filmsModel.removeObserver(this.#handleFilmModelEvent);
    this.#mode = filmDetailsMode.CLOSED;
  };

  #handleEscKeyDown = (evt) => {
    if (isEscape(evt)) {
      evt.preventDefault();
      this.#closeFilmDetails();
    }
  };

  #watchlistClickHandler = () => {
    this.#film.filmInfo.userDetails.watchlist = !this.#film.filmInfo.userDetails.watchlist;
    this.#changeData({...this.#film});
  };

  #watchedClickHandler = () => {
    this.#film.filmInfo.userDetails.alreadyWatched = !this.#film.filmInfo.userDetails.alreadyWatched;
    this.#changeData({...this.#film});
  };

  #favotiteClickHandler = () => {
    this.#film.filmInfo.userDetails.favorite = !this.#film.filmInfo.userDetails.favorite;
    this.#changeData({...this.#film});
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

  #handleFilmModelEvent = (updateType, data) => {
    this.#film = data;
    this.#filmDetailsComponent.updateElement({
      film: data
    });
  };

  #handleCommentsModelEvent = (updateType, data) => {
    this.#filmDetailsComponent.updateElement({
      comments: data
    });
  };
}
