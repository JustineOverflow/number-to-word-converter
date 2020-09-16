import { Module } from '@nestjs/common';
import { ConverterController } from './converter/converter.controller';

@Module({
  controllers: [ConverterController],
})
export class AppModule {}
