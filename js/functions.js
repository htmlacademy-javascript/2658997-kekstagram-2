//  Функция 1 Проверка длины строки

function checkStingLength (myString, maxLength) {
  return myString.length <= maxLength;
}

console.log(checkStingLength('sjdhfsdfsj', 15));


// Функция 2 Проверка на палиндром

function isPalindrom (myString) {
  const tempString = myString.replaceAll(' ', '').toLowerCase();
  const reverseString = tempString.split('').reverse().join('');

  return tempString === reverseString;
}

console.log(isPalindrom('топотf'));


// Функция 3 Извлечение цифр от 0 до 9

function getNumbers (myString) {
  if (typeof(myString) === 'number') {
    myString = myString.toString();
  }

  const result = [];

  for (let i = 0; i < myString.length; i++) {
    const char = parseInt(myString[i], 10);

    if (!Number.isNaN(char)) {
      result.push(char);
    }
  }

  return result.join('');
}

console.log(getNumbers('2023 год'));
