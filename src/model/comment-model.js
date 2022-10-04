import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{
  #commentsApiService = null;
  #comments = [];


  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
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

  addComment = async (updateType, update, film) => {
    try {
      const response = await this.#commentsApiService.addComment(update, film);
      this.#comments = [...response.comments];
      this._notify(updateType, this.#comments);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }

  };

  deleteComment = async (updateType, commentId) => {
    const index = this.#comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    try {
      await this.#commentsApiService.deleteComment(commentId);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];
      this._notify(updateType, this.#comments);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };
}


