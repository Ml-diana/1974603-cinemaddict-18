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

  get = (film) => {
    this.#comments = film.comment.map((commentId) =>
      this.#allComments.find((comment) =>
        comment.id === commentId)
    );

    return this.#comments;
  };

  updateComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };


  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}


