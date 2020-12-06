function removeNonAlphabetChars(str) {
  return str.replace(/[^A-Za-z]*/g, '');
}

function isPalindrome(str, caseSensitiveFlag) {
  str = removeNonAlphabetChars(str);

  if (!caseSensitiveFlag) {
    str = str.toLowerCase();
  }

  // Creates two pointers at the start and at the end of the string
  // Compares both pointers as they move towards each other
  for (let i=0, j=str.length-1; i<j; i++, j--) {
    if (str[i] !== str[j]) return false;
  }

  // If loop finishes then the string is a palindrome
  return true;
}

/**
 * Reference: https://youtu.be/nbTSfrEfo6M
 * Manacher's Algorithm: https://en.wikipedia.org/wiki/Longest_palindromic_substring
 */
function findLongestPalindromicSubstring(str, caseSensitiveFlag) {
  str = removeNonAlphabetChars(str);

  if (!caseSensitiveFlag) {
    str = str.toLowerCase();
  }

  // Separate each character with `#` to better handle even length strings
  // abca --> #a#b#c#a#
  // $ - start of the string
  // @ - end of the string
  str = `$#${str.split('').join('#')}#@`;

  const pLengths = new Array(str.length).fill(0); // Array for storing each character's palindromic length
  let center = 0; // Index of the center of the current palindrome
  let rightBoundary = 0; // Index of the right boundary of the current palindrome
  let longest = 0; // Index of the longest palindrome

  for (let i=1; i<str.length-1; i++) {
    const mirror = 2*center-i; /* Index of the corresponding character on the left of the center with respect to `i`
                                * If you "fold" the array at the center. Mirror and `i` should overlap
                                */

    if (i<rightBoundary) { // This copies the length of the palindrome at `mirror` to skip recomputation
      pLengths[i] = Math.min(rightBoundary - i, pLengths[mirror]);
    }

    // Expansion step
    // Computes the length of the palindrome with its center at `i`
    while (str[i + (1+pLengths[i])] === str[i - (1+pLengths[i])]) {
      pLengths[i]++;
    }

    if (i+pLengths[i] > rightBoundary) { // If `i` is beyond the right boundary. A new palindrome is found
      center = i;
      rightBoundary = i + pLengths[i];

      if (pLengths[center] > pLengths[longest]) { // Mark the longest palindrome found
        longest = center;
      }
    }
  }

  str = str.substring(longest - pLengths[longest], longest + pLengths[longest]);
  str = removeNonAlphabetChars(str);
  return str;
}

module.exports = {
  isPalindrome,
  findLongestPalindromicSubstring,
};
