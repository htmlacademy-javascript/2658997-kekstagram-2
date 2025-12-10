import {getRandomInteger, getRandomArrayElement } from './util';

const PHOTOS_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MAX_COMMENTS_MESSAGE_COUNT = 30;
const MIN_AVATAR_ID_COUNT = 1;
const MAX_AVATAR_ID_COUNT = 6;

const PHOTO_DESCRIPTIONS = [
  'Птица сидит на ветке дерева.',
  'Кот спит на диване.',
  'Ребенок улыбается в камеру.',
  'Солнце садится над океаном.',
  'Горы покрыты снегом.',
  'Машина едет по дороге.',
  'Цветы цветут в саду.',
  'Люди гуляют по парку.',
  'Собака бежит по пляжу.',
  'Луна светит в ночном небе.',
  'Книга лежит на столе.',
  'Руки держат чашку кофе.',
  'Листья падают с деревьев осенью.',
  'Дождь идет на улице.',
  'Облака плывут по небу.',
  'Мальчик играет с мячом.',
  'Девочка читает книгу.',
  'Рыба плавает в аквариуме.',
  'Дом стоит на холме.',
  'Фрукты лежат в миске.',
  'Свеча горит в темноте.',
  'Мост пересекает реку.',
  'Бабочка летит над цветами.',
  'Человек сидит на скамейке.',
  'Самолет летит в небе.'
];
const COMMENT_AUTHOR_NAMES = [
  'Степан',
  'Слава',
  'Алексей',
  'Диана',
  'Полина',
  'Рамазан',
];
const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


let commentId = 1;

const createComment = () => {
  const sentences = Array.from(
    { length: getRandomInteger(1, 2) }, () => getRandomArrayElement(COMMENT_MESSAGES));

  return {
    id: commentId++,
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID_COUNT, MAX_AVATAR_ID_COUNT)}.svg`,
    message: sentences.join('. '),
    name: getRandomArrayElement(COMMENT_AUTHOR_NAMES),
  };
};


const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from({length: getRandomInteger(0,MAX_COMMENTS_MESSAGE_COUNT)}, createComment),
});

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, (_, index) => createPhoto(index + 1));

export {createPhotos};

