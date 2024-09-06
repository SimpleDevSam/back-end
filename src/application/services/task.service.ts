import { Injectable } from '@nestjs/common';
import { Task } from '../../domain/taskSchema';
import { TaskRepository } from 'src/infra/repositories/TaskRepository';
import { ResourceNotFound } from 'src/application/errors/ResourceNotFound';
import { ResponseResult } from 'src/shared/Response'



@Injectable()
export class TasksService {
  constructor(private readonly _taskRepository: TaskRepository) { }


  async create(task: Task): Promise<ResponseResult<Task>> {
    await this._taskRepository.create(task);
    const response: ResponseResult<Task> = { isSuccess: true }
    return response
  }

  async getAll(limit: number, offset: number): Promise<ResponseResult<Task[]>> {
    const tasks = await this._taskRepository.findAll(limit, offset);
    const response: ResponseResult<Task[]> = { isSuccess: true, data: tasks }
    return response
  }

  async getOne(id: string): Promise<ResponseResult<Task>> {
    const task = await this._taskRepository.findOneById(id);

    if (!task) {
      throw new ResourceNotFound();
    }

    const response: ResponseResult<Task> = { isSuccess: true, data: task }
    return response
  }

  async update(id: string, task: Task): Promise<ResponseResult<Task>> {
    const taskToBeUpdated = await this._taskRepository.updateOneById(id, task);

    if (!taskToBeUpdated) {
      throw new ResourceNotFound();
    }
    const response: ResponseResult<Task> = { isSuccess: true, data: taskToBeUpdated }

    return response
  }

  async delete(id: string): Promise<ResponseResult<Task>> {

    const task = await this._taskRepository.deleteOneById(id);
    if (!task) {
      throw new ResourceNotFound();
    }

    const response: ResponseResult<Task> = {isSuccess: true}
    return response

  }
}
