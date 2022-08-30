import FilmsListView from '../view/films-list-view.js';
import TopRatedFilmsListView from '../view/top-rated-films-list.js';
import FilmCardView from '../view/fim-card-view.js';
import MostCommentedFilmsListView from '../view/most-commented-films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import {render} from '../render.js';
import FilmDetailsView from '../view/film-details-view.js';

export default class FilmsPresenter {
  filmListComponent = new FilmsListView();
  showMoreButtonView = new ShowMoreButtonView();

  init = (cinemaContainer, filmsModel, commentsModel) => {
    this.cinemaContainer = cinemaContainer;
    this.filmsModel = filmsModel;
    this.commentsModel = commentsModel;
    this.films = [...filmsModel.films];

    render(this.filmListComponent, this.cinemaContainer);
    render(new TopRatedFilmsListView(), this.filmListComponent.getElement());
    render(new MostCommentedFilmsListView(), this.filmListComponent.getElement());
    for (let i = 0; i < this.films.length; i++) {
      render(new FilmCardView(this.films[i]), this.filmListComponent.getFilmsListContainerElement());
    }
    render(this.showMoreButtonView, this.filmListComponent.getFilmsListElement());
    const comments = [...this.commentsModel.get(this.films[0])];
    render (new FilmDetailsView(this.films[0], comments), document.body);
  };
}

