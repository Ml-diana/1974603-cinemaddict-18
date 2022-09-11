import {getRandomInteger, getRandomArrayElement} from '../utils/utils.js';
import {FILM_COUNT, titles, posters, genres, descriptions, names, surnames, AgeRating, Rating, countries} from './const.js';
import {nanoid} from 'nanoid';

export const generateStandardCardFilm = () => ({
  'id': nanoid(),
  'title': getRandomArrayElement(titles),
  'alternativeTitle': getRandomArrayElement(titles),
  'totalRating': getRandomInteger(Rating.MIN, Rating.MAX),
  'poster': getRandomArrayElement(posters),
  'ageRating': getRandomInteger(AgeRating.MIN, AgeRating.MAX),
  'director': `${getRandomArrayElement(names)} ${getRandomArrayElement(surnames)}`,
  'writers': Array.from({length: 2}, () => `${getRandomArrayElement(names)} ${getRandomArrayElement(surnames)}`),
  'actors': Array.from({length: 2}, () => `${getRandomArrayElement(names)} ${getRandomArrayElement(surnames)}`),
  'release': {
    'date': '2019-05-11T00:00:00.000Z',
    'releaseCountry': getRandomArrayElement(countries),
  },
  'runtime': 77,
  'genres': Array.from({length:3}, () => `${getRandomArrayElement(genres)}`),
  'description': getRandomArrayElement(descriptions),
  'userDetails': {
    'watchlist':  getRandomInteger (0,1) === 1,
    'alreadyWatched':  getRandomInteger (0,1) === 1,
    'watchingDate': '2019-04-12T16:12:32.554Z',
    'favorite':  getRandomInteger (0,1) === 1
  }
});

const generateFilms = () => {
  const films = Array.from({length: FILM_COUNT}, generateStandardCardFilm);
  let fullQuantityComments = 0;

  return films.map((film, index) => {
    const hasComments = getRandomInteger(0,1);
    const filmQuantityComments = (hasComments) ? getRandomInteger(1,5) : 0;
    fullQuantityComments += filmQuantityComments;

    return {
      id: String(index + 1),
      comment: (hasComments) ? Array.from ({length: filmQuantityComments}, (_value, commentIndex) => String(fullQuantityComments - commentIndex))
        : [],
      filmInfo: film
    };
  });

};
export {generateFilms};

