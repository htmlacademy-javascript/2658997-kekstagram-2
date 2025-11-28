//  Функция 1 Проверка длины строки

const checkStringLength = (myString, maxLength) => myString.length <= maxLength;
// console.log(checkStringLength('qwerty', 6)); // true
// console.log(checkStringLength('qwertyqwerty', 5)); // false


// Функция 2 Проверка на палиндром

function isPalindrome(myString) {
  const tempString = myString.replaceAll(' ', '').toLowerCase();
  let result = true;

  for (let i = 0; i < Math.floor(tempString.length / 2); i++) {

    if (tempString[i] !== tempString[tempString.length - 1 - i]) {
      result = false;
      break;
    }
  }
  return result;
}
// console.log(isPalindrome('топот')); // true
// console.log(isPalindrome('топор')); // false


// Функция 3 Извлечение цифр от 0 до 9

function getNumbers (myString) {
  myString = myString.toString(); // На случай если введено число

  const result = [];

  for (let i = 0; i < myString.length; i++) {
    if (!Number.isNaN(parseInt(myString[i], 10))) {
      result.push(myString[i]);
    }
  }

  return result.length === 0 ? NaN : parseInt(result.join(''), 10);
}
// console.log(getNumbers(1.5), typeof(getNumbers(1.5))); // 15
// console.log(getNumbers(-1.5)); // 15
// console.log(getNumbers('qwerty')); // NaN
// console.log(getNumbers('qwerty2025')); // 2025
