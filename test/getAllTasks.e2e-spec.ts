import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { Task } from '@domain/entities/task';
import mongoose from 'mongoose';

describe('Task Controller (e2e)', () => {
  let app: INestApplication;
  let createdTask: Task

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {

    
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get all tasks', async () => {
    const response = await request(app.getHttpServer()).get('/tasks').expect(200);

    expect(response.body).toHaveProperty('isSuccess');
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);

    response.body.data.forEach((task: any) => {
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title');
      expect(task).toHaveProperty('keywords');
      expect(Array.isArray(task.keywords)).toBe(true);
      expect(task).toHaveProperty('creationDate');
      expect(task).toHaveProperty('updatedDate');
      expect(task).toHaveProperty('status');
    });
  });

  it('should create a task successfully', async () => {
    const taskDto = {
      title: 'New Task',
      status: '0',
      keywords: ['keyword1']
    };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(taskDto)
      .expect(201);

    console.log(response.body)

    expect(response.body).toHaveProperty('isSuccess', true);
    
    createdTask = response.body.data;
  });

  it('should return 400 when title is missing', async () => {
    const taskDto = {
      status: '0',
      keywords: ['keyword1']
    };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(taskDto)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 when status is missing', async () => {
    const taskDto = {
      title: 'New Task',
      keywords: ['keyword1']
    };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(taskDto)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 when keywords are missing', async () => {
    const taskDto = {
      title: 'New Task',
      status: '0'
    };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(taskDto)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 when keywords are empty', async () => {
    const taskDto = {
      title: 'New Task',
      status: '0',
      keywords: []
    };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(taskDto)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 when keywords contain invalid elements', async () => {
    const taskDto = {
      title: 'New Task',
      status: '0',
      keywords: [123] // Invalid element
    };

    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(taskDto)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });

  // Update Task Tests

  it('should update a task successfully', async () => {
    const taskDto = {
      id:createdTask.id,
      title: 'Updated Task',
      creationDate:createdTask.creationDate,
      status: '1',
      keywords: ['updatedKeyword']
    };

    const response = await request(app.getHttpServer())
      .put(`/tasks/${createdTask.id}`)
      .send(taskDto)
      .expect(200);

    expect(response.body).toHaveProperty('isSuccess', true);
    expect(response.body.data).toHaveProperty('title', 'Updated Task');
    expect(response.body.data).toHaveProperty('status', '1');
    expect(response.body.data.keywords).toEqual(['updatedKeyword']);
  });

  it('should return 400 when updating a task with missing title', async () => {
    const taskDto = {
      id:createdTask.id,
      creationDate:createdTask.creationDate,
      status: '1',
      keywords: ['updatedKeyword']
    };

    const response = await request(app.getHttpServer())
      .put(`/tasks/${createdTask.id}`)
      .send(taskDto)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 when updating a task with missing status', async () => {
    const taskDto = {
      id:createdTask.id,
      title: 'Updated Task',
      creationDate:createdTask.creationDate,
      keywords: ['updatedKeyword']
    };

    const response = await request(app.getHttpServer())
      .put(`/tasks/${createdTask.id}`)
      .send(taskDto)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 when updating a task with empty keywords', async () => {
    const taskDto = {
      id:createdTask.id,
      title: 'Updated Task',
      creationDate:createdTask.creationDate,
      status: '1',
      keywords: []
    };

    const response = await request(app.getHttpServer())
      .put(`/tasks/${createdTask.id}`)
      .send(taskDto)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 when updating a task with invalid keyword elements', async () => {
    const taskDto = {
      id:createdTask.id,
      title: 'Updated Task',
      creationDate:createdTask.creationDate,
      status: '1',
      keywords: [123]
    };

    const response = await request(app.getHttpServer())
      .put(`/tasks/${createdTask.id}`)
      .send(taskDto)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });

  it('should get a task by ID successfully', async () => {
    const response = await request(app.getHttpServer())
      .get(`/tasks/${createdTask.id}`)
      .expect(200);

    expect(response.body).toHaveProperty('isSuccess', true);
    expect(response.body.data).toHaveProperty('id', createdTask.id);
    expect(response.body.data).toHaveProperty('title', 'Updated Task');
    expect(response.body.data).toHaveProperty('status', '1');
    expect(Array.isArray(response.body.data.keywords)).toBe(true);
  });

  it('should return 404 when the task ID is not found', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    const response = await request(app.getHttpServer())
      .get(`/tasks/${nonExistentId}`)
      .expect(404);

    expect(response.body).toHaveProperty('message', 'Recurso não encontrado');
  });

  it('should return 400 when the task ID is invalid', async () => {
    const invalidId = 'invalid-id';
    const response = await request(app.getHttpServer())
      .get(`/tasks/${invalidId}`)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });

  it('should delete a task successfully', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/tasks/${createdTask.id}`)
      .expect(200);

    expect(response.body).toHaveProperty('isSuccess', true);
  });

  it('should return 404 when trying to delete a non-existent task', async () => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000'; // Example UUID
    const response = await request(app.getHttpServer())
      .delete(`/tasks/${nonExistentId}`)
      .expect(404);

    expect(response.body).toHaveProperty('message', 'Recurso não encontrado');
  });

  it('should return 400 when trying to delete a task with invalid ID format', async () => {
    const invalidId = 'invalid-id';
    const response = await request(app.getHttpServer())
      .delete(`/tasks/${invalidId}`)
      .expect(400);

    expect(response.body).toHaveProperty('message');
  });
});
