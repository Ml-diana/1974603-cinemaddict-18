import ProfileNameView from './view/profile-name-view';
import FilmsPresenter from './presenter/films-presenter.js';
import StatisticsView from './view/statistics-view.js';
import {render} from './framework/render.js';
import FilmsModel from './model/film-model.js';
import CommentsModel from './model/comment-model.js';
import FilterModel from './model/filter-model';
import FilmsApiService from './films-api-service';
import CommentsApiService from './comments-api-service';

const AUTHORIZATION = 'Basic dj34Er5un9Stml7k';
const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel, commentsModel, filterModel);
render(new ProfileNameView(), siteHeaderElement);
render(new StatisticsView(), siteFooterElement);


filmsPresenter.init();
filmsModel.init();
