const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

// const getRandomIdFromRangeGenerator = (min, max) => {
//   const previousValues = [];

//   return function () {
//     if (previousValues.length >= (max - min + 1)) {
//       return null; // Все числа из диапазона уже выданы
//     }
//     let currentValue = getRandomInteger(min, max);
//     while (previousValues.includes(currentValue)) {
//       currentValue = getRandomInteger(min, max);
//     }
//     previousValues.push(currentValue);
//     return currentValue;
//   };
// };

export {getRandomInteger, getRandomArrayElement, createIdGenerator};
