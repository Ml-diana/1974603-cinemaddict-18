import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;
const COMMAND_KEY_CODE = 91;


dayjs.extend(duration);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];


const formatDateWithYear = (date) => dayjs(date).format('YYYY');
const formatDate = (date) => dayjs(date).format('DD MMMM YYYY');
const formatMinutes = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');


export const isEscape = (evt) => evt.keyCode === ESC_KEY_CODE;
export const isCtrlEnter = (evt) => evt.keyCode === ENTER_KEY_CODE && (evt.ctrlKey || COMMAND_KEY_CODE);


export const sortByDate = (filmA, filmB) => (dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date)));

export const sortByRating = (filmA, filmB) => (filmB.filmInfo.rating - filmA.filmInfo.rating);

export const sortByComments = (filmA, filmB) => (filmB.comments.length - filmA.comments.length);


export {getRandomInteger, formatDate, formatMinutes, getRandomArrayElement,formatDateWithYear};
