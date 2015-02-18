function isPalindrome(str) {
  var forward = str.toLowerCase();
  var reverse = forward.split('').reverse().join('');
  var result;
  forward !== reverse ? result = false : result = true;

  return result;
}
