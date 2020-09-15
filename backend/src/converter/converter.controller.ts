import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';

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
  return combinations
}

import {Response} from 'express'

@Controller('converter')
export class ConverterController {

  @Get()
  getCombinations(@Res() response: Response,
                  @Query('number') number?: string,) {
    const combinations = convertNumberToString(number)
    response.status(HttpStatus.ACCEPTED).json( {
      combinations
    });
  }
}

