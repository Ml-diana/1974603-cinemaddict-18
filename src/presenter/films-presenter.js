import FilmsListView from '../view/films-list-view.js';
import TopRatedFilmsListView from '../view/top-rated-films-list.js';
import FilmCardView from '../view/fim-card-view.js';
import MostCommentedFilmsListView from '../view/most-commented-films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import {render} from '../render.js';
import FilmDetailsView from '../view/film-details-view.js';

export default class FilmsPresenter {
  filmCardListComponent = new FilmsListView();

  init = (cinemaContainer, filmsModel, commentsModel) => {
    this.cinemaContainer = cinemaContainer;
    this.filmsModel = filmsModel;
    this.commentsModel = commentsModel;
    this.films = [...filmsModel.get()];

    render(this.filmCardListComponent, this.cinemaContainer);
    render(new TopRatedFilmsListView(), this.filmCardListComponent.getElement());
    render(new MostCommentedFilmsListView(), this.filmCardListComponent.getElement());
    for (let i = 0; i < this.films.length; i++) {
      render(new FilmCardView(this.films[i]), this.filmCardListComponent.getFilmsListContainerElement());
    }
    render(new ShowMoreButtonView(), this.filmCardListComponent.getFilmsListElement());
    const comments = [...this.commentsModel.get(this.films[0])];
    render (new FilmDetailsView(this.films[0], comments), this.cinemaContainer.parentElement);
  };
}
