import {generateComments} from '../mock/comment-data.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{
  #filmsModel = null;
  #allComments = [];
  #comments = [];


  constructor(filmsModel) {
    super();
    this.#filmsModel = filmsModel;
    this.#generateAllComments();
  }

  #generateAllComments() {
    this.#allComments = generateComments(this.#filmsModel.films);
  }

  getFilmComments = (film) => {
    this.#comments = film.comment.map((commentId) =>
      this.#allComments.find((comment) =>
        comment.id === commentId)
    );
  };

  get comments() {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    this.#comments = [
      ...this.#comments,
      update,
    ];

    this._notify(updateType, this.#comments);
  };

  deleteComment = (updateType, commentId) => {
    const index = this.#comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, this.#comments);
  };
}


