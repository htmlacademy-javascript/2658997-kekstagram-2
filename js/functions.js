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


// Функция 4 Делу - Время

const timeToMinutes = (timeString) => {
  timeString = timeString.split(':');

  return parseInt(timeString[0], 10) * 60 + parseInt(timeString[1], 10);
};

const validateMeetingTime = (startDay, endDay, startMeeting, durationMeeting) => (

  timeToMinutes(startDay) <= timeToMinutes(startMeeting) &&
  timeToMinutes(endDay) >= timeToMinutes(startMeeting) + durationMeeting
);

window.console.log(validateMeetingTime('08:00', '17:30', '14:00', 90));
window.console.log(validateMeetingTime('8:0', '10:0', '8:0', 120));
window.console.log(validateMeetingTime('08:00', '14:30', '14:00', 90));
window.console.log(validateMeetingTime('14:00', '17:30', '08:0', 90));
window.console.log(validateMeetingTime('8:00', '17:30', '08:00', 900));
