import FilmsListView from '../view/films-list-view.js';
import TopRatedFilmsListView from '../view/top-rated-films-list.js';
import FlmCardTheDanceOfLifeTemplate from '../view/film-card-the-dance-of-life-view';
import MostCommentedFilmsListView from '../view/most-commented-films-list.js';
import ShowMoreButtonView from '../view/show-more-button.js';


import {render} from '../render.js';

export default class FilmsPresenter {
  filmCardListComponent = new FilmsListView();

  init = (cinemaContainer) => {
    this.cinemaContainer = cinemaContainer;

    render(this.filmCardListComponent, this.cinemaContainer);
    render(new TopRatedFilmsListView(), this.filmCardListComponent.getElement());
    render(new MostCommentedFilmsListView(), this.filmCardListComponent.getElement());
    for (let i = 0; i < 5; i++) {
      render(new FlmCardTheDanceOfLifeTemplate(), this.filmCardListComponent.getFilmsListContainerElement());
    }

    render(new ShowMoreButtonView(), this.filmCardListComponent.getFilmsListElement());
  };
}

