import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Task } from '../src/domain/entities/task'
import type ResponseResult from '../src/shared/abstractions/Response';
import { AppModule } from '../src/app.module';
import { TasksService } from '../src/application/services/tasks/task.service';

describe('Task Controller (e2e)', () => {
  let app: INestApplication;
  let catsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get all tasks', async () => {
    return request(app.getHttpServer())
      .get('/task')
      .expect(200)
  });

  afterAll(async () => {
    await app.close();
  });

});

