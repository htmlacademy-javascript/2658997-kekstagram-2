function checkStringLenth (string, maxLength) {
  return string.length <= maxLength;
}

const result = checkStringLenth('qwerty, 10');
console.log(result);


function isPalindrom(string) {
  let newString = string.replaceAll(' ', '');
  let testString = '';
  newString = string.toLowerCase();

  for (let i = length(newString) - 1; i >= 0; i--) {
    testString += newString[i];
  }

  return newString === testString;
}
