import { Test, TestingModule } from '@nestjs/testing';
import { ConverterController } from './converter.controller';

describe('converter', () => {
  let converterController: ConverterController;

  beforeEach(async () => {
    const converter: TestingModule = await Test.createTestingModule({
      controllers: [ConverterController],
    }).compile();
    converterController = converter.get<ConverterController>(ConverterController);
  });

  it('should convert a number into list of words',  () => {
    expect(converterController.convertNumberToString('23')).toBe("ad,bd,cd,ae,be,ce,af,bf,cf")
  });
});
