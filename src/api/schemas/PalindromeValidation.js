const { celebrate, Joi } = require('celebrate');

const palindromeCheck = celebrate({
  query: {
    str: Joi.string().required(),
    caseSensitive: Joi.boolean(),
  }
});

const findLongestPalindrome = celebrate({
  body: Joi.object({
    str: Joi.string().required(),
  }),
  query: {
    caseSensitive: Joi.boolean(),
  }
});

const findMinimiumCuts = celebrate({
  body: Joi.object({
    str: Joi.string().required(),
  }),
  query: {
    caseSensitive: Joi.boolean(),
  }
});

module.exports = {
  palindromeCheck,
  findLongestPalindrome,
  findMinimiumCuts,
};
