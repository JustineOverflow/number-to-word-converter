import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConverterController } from './converter/converter.controller';

@Module({
  imports: [],
  controllers: [AppController, ConverterController],
  providers: [AppService],
})
export class AppModule {}
