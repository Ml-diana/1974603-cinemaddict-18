import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{
  #commentsApiService = null;
  #comments = [];


  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
    console.log(commentsApiService);
  }

  getFilmComments = (film) => {
    this.#commentsApiService.getFilmsComments(film.id).then((response) => {
      this.#comments = response;
      this._notify('Major', this.#comments);
    });
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


