const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY:'history',
  FAVORITES:'favorites'
};

const SortingType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const HttpMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const FilmDetailsMode = {
  OPENED: 'OPENED',
  CLOSED: 'CLOSED'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const ONE_PART_OF_THE_FILMS = 5;
const SHAKE_ANIMATION_TIMEOUT = 600;

export {FilterType, SortingType, FilmDetailsMode, TimeLimit, ONE_PART_OF_THE_FILMS, SHAKE_ANIMATION_TIMEOUT};
