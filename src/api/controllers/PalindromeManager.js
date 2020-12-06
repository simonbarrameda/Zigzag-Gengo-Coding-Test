const palindromeSvc = require('../../services/palindrome');
const log = require('../../utils/logger');

function palindromeCheck(req, res) {
  log.info('Starting process for palindrome check');
  const { str, caseSensitive } = req.query;

  const result = palindromeSvc.isPalindrome(str, caseSensitive);

  res.send({
    status: 1,
    result: result
  });
}

function findLongestPalindrome(req, res) {
  log.info('Starting process for finding longest palindromic substring');
  const { caseSensitive } = req.query;
  const { str } = req.body;

  const result = palindromeSvc.findLongestPalindromicSubstring(str, caseSensitive);

  res.send({
    status: 1,
    result: result
  });
}

function findMinimiumCuts(req, res) {
  log.info('Starting process for finding the minimum cuts so all substrings are palindromes');
  const { caseSensitive } = req.query;
  const { str } = req.body;

  const result = palindromeSvc.getMinimumCutsForPalindromes(str, caseSensitive);

  res.send({
    status: 1,
    result: result
  });
}

module.exports = {
  palindromeCheck,
  findLongestPalindrome,
  findMinimiumCuts,
};
