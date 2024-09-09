import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'
import { TasksService } from '../src/application/services/tasks/task.service';

describe('Task Controller (e2e)', () => {
  let app: INestApplication;
  let tasksService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(TasksService)
      .useValue(TasksService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get all tasks', async () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect({
        data: tasksService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });

});

