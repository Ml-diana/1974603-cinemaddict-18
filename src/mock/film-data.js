import { getRandomInteger, getRandomValue} from '../utils';
import {FILM_COUNT, titles, posters, genres, descriptions, names, surnames, AgeRating, Rating, countries} from './const.js';

export const generateStandardCardFilm = () => ({
  'title': getRandomValue(titles),
  'alternativeTitle': getRandomValue(titles),
  'totalRating': getRandomInteger(Rating.MIN, Rating.MAX),
  'poster': getRandomValue(posters),
  'ageRating': getRandomInteger(AgeRating.MIN, AgeRating.MAX),
  'director': `${getRandomValue(names)} ${getRandomValue(surnames)}`,
  'writers': Array.from({length: 2}, () => `${getRandomValue(names)} ${getRandomValue(surnames)}`),
  'actors': Array.from({length: 2}, () => `${getRandomValue(names)} ${getRandomValue(surnames)}`),
  'release': {
    'date': '2019-05-11T00:00:00.000Z',
    'releaseCountry': getRandomValue(countries),
  },
  'runtime': 77,
  'genre': Array.from({length:3}, () => `${getRandomValue(genres)}`),
  'description': getRandomValue(descriptions)

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
