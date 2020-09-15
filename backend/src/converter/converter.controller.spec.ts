import { convertNumberToString } from './converter.controller';

describe('converter', () => {

  it('should convert a number into list of words', () => {
    expect(convertNumberToString('23')).toEqual(["ad","bd","cd","ae","be","ce","af","bf","cf"]);
  });

});
