const checkStringLength = (string, maxLength) => string.length <= maxLength;
console.log(checkStringLength('qwerty', 10));


function isPalindrome(myString) {
  myString = myString.replaceAll(' ', '').toLowerCase();
  let result = true;
  for (let i = 0; i < Math.floor(myString.length / 2); i++) {

    if (myString[i] !== myString[myString.length - 1 - i]) {
      result = false;
      break;
    }
  }
  return result;
}
console.log(isPalindrome('ша шалаш аш'));


function getNumber (myString) {
  myString = myString.toString(); // На случай если введено число
  let tempString = '';

  for (let i = 0; i < myString.length; i++) {
    if(!isNaN(parseInt(myString[i], 10))) {
      tempString += myString[i];
    } else {
      continue;
    }
  }

  return tempString === '' ? NaN : parseInt(tempString, 10);
}

console.log(getNumber('hello123 world 345'), typeof(getNumber('hello123 world 456')));
console.log(getNumber('qwerty qw er ty'), typeof(getNumber('qwerty qw er ty')));

