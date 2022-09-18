import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {formatDate, formatMinutes, formatFullDate} from '../utils/utils.js';

const createFilmDetailsTemplate = (film, comments) => (

  `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
  <div class="film-details__close">
  <button class="film-details__close-btn" type="button">close</button>
</div>
<div class="film-details__info-wrap">
  <div class="film-details__poster">
    <img class="film-details__poster-img" src="${film.filmInfo.poster}" alt="${film.filmInfo.title}">
    <p class="film-details__age">${film.filmInfo.ageRating}+</p>
  </div>
  <div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${film.filmInfo.title}</h3>
        <p class="film-details__title-original">${film.filmInfo.alternativeTitle}</p>
      </div>
      <div class="film-details__rating">
        <p class="film-details__total-rating">${film.filmInfo.rating}</p>
      </div>
    </div>
    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${film.filmInfo.director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${film.filmInfo.writers}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${film.filmInfo.actors}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${formatDate(film.filmInfo.release.date)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${formatMinutes(film.filmInfo.runtime)}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${film.filmInfo.release.releaseCountry}</td>
      </tr>
      <tr class="film-details__row">
      <td class="film-details__term">${film.filmInfo.genres.length > 1 ? 'Genres' : 'Genre'}</td>
        <td class="film-details__cell">
        ${film.filmInfo.genres.map((genreItem) => `<span class="film-details__genre">${genreItem}</span>`).join('')}
          </td>
      </tr>
    </table>
    <p class="film-details__film-description">
     ${film.filmInfo.description}
    </p>
  </div>
</div>
<section class="film-details__controls">
  <button type="button" class="film-details__control-button  ${film.filmInfo.userDetails.watchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
  <button type="button" class="film-details__control-button ${film.filmInfo.userDetails.alreadyWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
  <button type="button" class="film-details__control-button  ${film.filmInfo.userDetails.favorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
</section>
</div>
<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comment.length}</span></h3>
        <ul class="film-details__comments-list">
        ${comments.map((item) =>`<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${item.emotion}.png" width="55" height="55" alt="emoji-${item.emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${item.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${item.author}</span>
            <span class="film-details__comment-day">${formatFullDate(item.date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`).join('')}
      </ul>
    <form class="film-details__new-comment" action="" method="get">

      <div class="film-details__add-emoji-label">
      <img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
      </div>


      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>
      <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" checked>
      <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
      </div>
      </form>
      </section>
    </div>
  </div>
</section>
`
);

export default class FilmDetailsView extends AbstractStatefulView {

  constructor(film, comments, emotion) {
    super();
    this._state = FilmDetailsView.parseFilmToState(
      film,
      comments,
      emotion
    );
    this.emojiHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  };

  setFavoritesClickHandler = (callback) => {
    this._callback.favoritesClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoritesClickHandler);
  };


  emojiHandlers = () => {
    //this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiClickHandler);
    this.element.querySelectorAll('.film-details__emoji-item')
      .forEach((element) => element.addEventListener('click', this.#emojiClickHandler));
  };

  #emojiClickHandler = () => {

  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();

  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #favoritesClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoritesClick();
  };

}
