import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

dayjs.extend(duration);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];


const formatDateWithYear = (date) => dayjs(date).format('YYYY');
const formatDate = (date) => dayjs(date).format('DD MMMM YYYY');
const formatFullDate = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');
const formatMinutes = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');


export const isEscape = (evt) => evt.keyCode === ESC_KEY_CODE;
export const isCtrlEnter = (evt) => evt.keyCode === ENTER_KEY_CODE && evt.ctrlKey;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const sortByDate = (filmA, filmB) => (dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date)));

export const sortByRating = (filmA, filmB) => (filmB.filmInfo.rating - filmA.filmInfo.rating);

export {getRandomInteger, formatDate, formatFullDate, formatMinutes, getRandomArrayElement,formatDateWithYear};
