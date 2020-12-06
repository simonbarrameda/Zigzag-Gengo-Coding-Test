# Zigag Gengo Coding Test

Backend server for zigzag assessment functions

## Requirements

* Node (v10.23)
* npm (6.14.8)

## Installation

Install node modules

```npm install```

## Configuration

You can change the **PORT** and the **NODE_ENV** in the `.env` file.

###### ***NOTE:*** *This file usually should be omitted from the repo. It was retained for demonstration purposes*

## Environments

1. `production` - Logs to files only.
2. `development` - Logs to console and files.

## API List

**Definition**

`GET /health`

Checks the status of the server

---

**Definition**

`GET /palindrome/check`

Checks if the given string is a palindrome

**Query Parameters**
- `str: string (required)` Input string to be validated
- `caseSensitive: boolean` Flag for validating the string with case sensitivity

---

**Definition**

`POST /palindrome/longest-substr`

**Query Parameters**
- `caseSensitive: boolean` Flag for validating the string with case sensitivity

**Body Parameters**
- `str: string (required)` Input string to be validated

---

**Definition**

`POST /palindrome/minimum-cuts`

**Query Parameters**
- `caseSensitive: boolean` Flag for validating the string with case sensitivity

**Body Parameters**
- `str: string (required)` Input string to be validated

---

## Technical Information

###### NOTE: The logic for the required functions are located in `src/services/palindrome.js`

### **Palindrome check**
Create two pointers that iterates through the string. One starts from the left and the other starts from the right. Compare the value of the pointers for each iteration until they meet at the middle. If the pointers' value did not match then the string is not a palindrome. If the pointers were able to meet and their values did not differ, then the string is a palindrome.

- *Time complexity* - `O(n/2)`
- *Space complexity* - `O(1)`

### **Longest palindromic substring**
#### Step 1

Separate each character with `#` to better handle even length strings. This helps when determining the *center* of a palindrome.
`E.g: ababa --> #a#b#a#b#a#`

Add helper characters to identify the start and end of the string. This helps to not go out of bounds of the string.
`E.g: $#a#b#a#b#a#@`

#### Step 2
Create an array `pLengths` to store the corresponding palindrome length of each index of the string

Create pointers `center` and `rightBoundary` to indicate the index of center for the current palindrome and the index of the rightmost character of the palindrome respectively

Also create a pointer `mirror` to help in determining the palindrome length of the index currently being expanded

#### Step 3
Iterate through the string while *expanding* on each character to determine its palindrome length. And update `pLengths` accordingly.

```
m = mirror
C = center
R = rightBoundary
i = current index

Iteration 1
                 m
                 C
                 R
                     i
str      = | $ | # | a | # | b | # | a | # | b | # | a | # | @ |

pLengths = | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
```

This turns to the following:
```
Iteration 1
                 m
                 C
                 R
                     i
str      = | $ | # | a | # | b | # | a | # | b | # | a | # | @ |

pLengths = | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
```

Notice the value of `pLengths` at index `i`. This is the length of the palindrome with its center at `i`.

After finding a palindrome. We move the pointers correspondingly.
```
Iteration 1
                 m
                     C
                         R
                     i
str      = | $ | # | a | # | b | # | a | # | b | # | a | # | @ |

pLengths = | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
```

Repeat this for each character. The index with highest value in `pLengths` is the center of the longest palindrome. This will run in a time complexity of `O(n^2)`

In order to be able to determine the longest palindromic substring in linear time, we can use Manacher's Algorithm.

The `mirror` pointer will be able to help in skipping computations as we iterate through the string since we know that the *left* part of a palindrome is a mirror of its *right*

```
Iteration 6
                     m
                             C
                                         R
                                     i
str      = | $ | # | a | # | b | # | a | # | b | # | a | # | @ |

pLengths = | 0 | 0 | 1 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
```

Given the state above, we are currently expanding on `a` at index: 6. Notice the value at the mirror pointer. This indicates that the index we are currently expanding at is a palindrome of length ***at least*** 1

This gives us the chance to skip the comparisons for the indeces at 5 and 7 since we know they are already equal. We then start comparing at the next indeces.

```
Iteration 6
                     m
                             C
                                         R
                                     i
str      = | $ | # | a | # | b | # | a | # | b | # | a | # | @ |

pLengths = | 0 | 0 | 1 | 0 | 3 | 0 | 5 | 0 | 0 | 0 | 0 | 0 | 0 |
```

Final state:

```
Iteration 12
                                                 m
                                                     C
                                                         R
                                                             i
str      = | $ | # | a | # | b | # | a | # | b | # | a | # | @ |

pLengths = | 0 | 0 | 1 | 0 | 3 | 0 | 5 | 0 | 3 | 0 | 1 | 0 | 0 |
```

- *Time complexity* - `O(n)`
- *Space complexity* - `O(1)`

*References: [Manacher's Algorithm](https://en.wikipedia.org/wiki/Longest_palindromic_substring)*

### Split string into minimum number of palindromes

Iterate through all possible substrings of a string by recursively splitting the string into a `leftString` and a `rightString`

The base case is if the current string to be split is a palindrome. Then return the minimum number of splits before reaching this.

Since we know that a the left side of a palindrome is a mirror of its right, we can use a look-up table to store previous solutions. So when a string is split, we can use the table to determine its value so we can skip on repeating the computation.

- *Time complexity* - `O(n^2)`
- *Space complexity* - `O(n)`
