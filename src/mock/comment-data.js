import {getRandomArrayElement} from '../utils/utils.js';

const comments = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh'
];
const emotions = ['smile', 'sleeping', 'puke', 'angry'];
const names = [
  'John',
  'Tim',
  'Tom'
];

const surnames = [
  'Doe',
  'Macoveev',
  'Smith'
];

const generateComment = () => ({
  'author': Array.from({length: 1}, () => `${getRandomArrayElement(names)} ${getRandomArrayElement(surnames)}`),
  'comment': getRandomArrayElement(comments),
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': getRandomArrayElement(emotions)
});

const getCommentQuantity = (films) => films.reduce((count, film) => count + film.comments.length, 0);
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

