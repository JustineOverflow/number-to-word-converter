import { Test, TestingModule } from '@nestjs/testing';
import { ConverterController } from './converter.controller';

describe('converter', () => {
  it('should convert a number into list of words',  () => {
    expect(ConverterController.convertNumberToString('23')).toBe('[ad, ae, af, bd, be, bf, cd, ce, cf]')
  });
});
