import {FilterType} from '../utils/const.js';

const filters = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.filmInfo.userDetails.watchlist === true),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.filmInfo.userDetails.history === true),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.filmInfo.userDetails.favorites === true),
};

const filterFilm = (films, filterType) => filters[filterType](films);

export {filterFilm};
