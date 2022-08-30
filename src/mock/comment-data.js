import {getRandomValue} from '../utils.js';
import {comments, emotions ,names, surnames} from './const.js';

const generateComment = () => ({
  'author': Array.from({length: 1}, () => `${getRandomValue(names)} ${getRandomValue(surnames)}`),
  'comment': getRandomValue(comments),
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': getRandomValue(emotions)
});

const getCommentQuantity = (films) => films.reduce((count, film) => count + film.comment.length, 0);
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

