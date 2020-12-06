const { Router } = require('express');
const PalindromeManager = require('./controllers/PalindromeManager');
const PalindromeValidation = require('./schemas/PalindromeValidation');
const routes = Router();

routes.get('/palindrome/check', [PalindromeValidation.palindromeCheck, PalindromeManager.palindromeCheck]);

routes.post('/palindrome/longest-substr', [PalindromeValidation.findLongestPalindrome, PalindromeManager.findLongestPalindrome]);
routes.post('/palindrome/minimum-cuts', [PalindromeValidation.findMinimiumCuts, PalindromeManager.findMinimiumCuts]);

module.exports = routes;
