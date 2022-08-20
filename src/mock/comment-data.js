import dayjs from 'dayjs';
import {getRandomValue} from '../utils.js';
import { comment, emotion ,name, surname} from './const.js';

const generateComment = () => ({
  'author': Array.from({length: 2}, () => `${getRandomValue(name)} ${getRandomValue(surname)}`),
  'comment': getRandomValue(comment),
  'data':  dayjs().toISOString,
  'emotion': getRandomValue(emotion)
});

const getCommentQuantity = (films) => films.reduce((count, film) => count + film.length, 0);
const generateComments = (films) => {
  const commentCount = getCommentQuantity(films);

  return Array.from({length: commentCount}, (_value, index) =>{
    const commentItem = generateComment();

    return {
      id: String(index + 1),
      ...commentItem,
    };
  });
};
export {generateComments};

