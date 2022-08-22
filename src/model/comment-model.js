import {generateComments} from '../mock/comment-data.js';

export default class CommentsModel {
  filmsModel = null;
  allComments = [];
  comments = [];


  constructor(filmsModel) {
    this.filmsModel = filmsModel;
    this.generateAllComments();
  }


  generateAllComments() {
    this.allComments = generateComments(this.filmsModel.films);
  }

  get = (film) => {
    this.comments = film.comment.map((commentId) =>
      this.allComments.find((comment) =>
        comment.id === commentId)
    );
    return this.comments; //array with id

  };
}


