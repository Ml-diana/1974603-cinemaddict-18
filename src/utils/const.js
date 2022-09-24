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

const UserAction = {
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {FilterType, SortingType, UserAction, UpdateType};
