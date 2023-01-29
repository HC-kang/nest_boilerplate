import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/register (POST)', () => {
    request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@test.com',
        username: 'test',
        password: 'test1234',
      })
      .expect(201);
  });

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@test.com',
        password: 'test1234',
      })
      .expect(200);
    token = response.body.token;
  });

  it('/auth/login (POST)', () => {
    request(app.getHttpServer())
      .get('/auth/me')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
