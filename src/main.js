import SortButtonView from './view/sort-button-view.js';
import NavigationListView from './view/navigation-list-view.js';
import ProfileNameView from './view/profile-name-view';
import FilmsPresenter from './presenter/films-presenter.js';
import StatisticsView from './view/statistics-view.js';
import {render} from './render.js';
import FilmsModel from './model/film-model.js';
import CommentsModel from './model/comment-model.js';
import { generateFilms } from './mock/film-data.js';


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel();
filmsModel.films = generateFilms();

const commentsModel = new CommentsModel(filmsModel);
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel);
render(new ProfileNameView(), siteHeaderElement);
render(new NavigationListView(), siteMainElement);
render(new SortButtonView(), siteMainElement);
render(new StatisticsView(), siteFooterElement);

filmsPresenter.init();
