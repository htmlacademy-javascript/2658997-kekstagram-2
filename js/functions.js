//  Функция 1 Проверка длины строки

const checkStringLength = (myString, maxLength) => myString.length <= maxLength;

window.console.log(checkStringLength('qwerty', 6)); // true
window.console.log(checkStringLength('qwertyqwerty', 5)); // false


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
window.console.log(isPalindrome('топот')); // true
window.console.log(isPalindrome('топор')); // false


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
window.console.log(getNumbers(1.5), typeof(getNumbers(1.5))); // 15
window.console.log(getNumbers(-1.5)); // 15
window.console.log(getNumbers('qwerty')); // NaN
window.console.log(getNumbers('qwerty2025')); // 2025
