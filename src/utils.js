const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) => items[getRandomInteger(0, items.length - 1)];

import dayjs from 'dayjs';
const formatDateWithYear = (date) => dayjs(date).format('YYYY');
const formatDate = (date) => dayjs(date).format('DD MMMM YYYY');
const formatFullDate = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');
const formatMinutes = (minutes) => dayjs.duration(minutes, 'minutes').format('H[h] mm[m]');

export {getRandomInteger, formatDate, formatFullDate, formatMinutes, getRandomValue,formatDateWithYear};
