import {FilterType} from '../utils/const.js';

const filters = {
  [FilterType.ALL]: (films) => [...films],
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist === true),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched === true),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite === true),
};

const filterFilms = (films, filterType) => filters[filterType](films);

export {filterFilms};
