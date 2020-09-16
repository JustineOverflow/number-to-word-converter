import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import fetch from 'node-fetch';

const keyboardLetters = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
};

export function convertNumberToString(number) {
  let combinations = [''];
  for (const digits of number) {
    const combinationPerInteraction = [];
    for (const letter of keyboardLetters[digits]) {
      for (const combination of combinations) {
        combinationPerInteraction.push(combination + letter);
      }
    }
    combinations = combinationPerInteraction;
  }
  return combinations;
}

import { Response } from 'express';

@Controller('converter')
export class ConverterController {

  @Get()
  getCombinations(@Res() response: Response,
                  @Query('number') number?: string,
                  @Query('filter') filter?: string) {
    if (number.length === 0) {
      response.status(HttpStatus.BAD_REQUEST).json({
        reason: 'Missing number',
      });
      return;
    }
    if (number.split('')
      .filter(x => !Object.keys(keyboardLetters).includes(x))
      .length > 0) {
      response.status(HttpStatus.BAD_REQUEST).json({
        reason: 'Use only digits from 2 to 9',
      });
      return;
    }
    const combinations = convertNumberToString(number);

    if (filter === "true") {
      let filteredCombinations = combinations;
      fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json')
        .then(response =>  response.json())
        .then(data => {
          for (let index = 0; index < combinations.length; index++) {
            if (data[combinations[index]] === undefined)
              filteredCombinations = combinations.filter(word => data[word] === 1)
          }
          response.status(HttpStatus.ACCEPTED).json({
            combinations: filteredCombinations,
          });
        })
        .catch(error => console.log(error))
      return
    } else {
      response.status(HttpStatus.ACCEPTED).json({
        combinations,
      });
      return;
    }
  }
}
