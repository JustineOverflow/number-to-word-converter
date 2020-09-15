import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/converter (GET)', () => {
    return request(app.getHttpServer())
      .get('/converter?number=23')
      .expect(HttpStatus.ACCEPTED)
  });

  it('/converter (GET) error empty number', () => {
    return request(app.getHttpServer())
      .get('/converter?number=')
      .expect(HttpStatus.BAD_REQUEST)
  });
  it('/converter (GET) error wrong digit', () => {
    return request(app.getHttpServer())
      .get('/converter?number=21')
      .expect(HttpStatus.BAD_REQUEST)
  });
});
