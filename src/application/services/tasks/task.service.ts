import { Injectable } from '@nestjs/common';
import { TaskRepository } from 'src/infra/repositories/TaskRepository';
import ResponseResult from 'src/shared/abstractions/Response';
import { CreateTaskDTO } from '../../DTOs/createTaskDTO';
import { createTaskFromDTO } from 'src/shared/helpers/createTaskFromDTO ';
import { Task } from 'src/domain/entities/task';
import { UpdateTaskDTO } from '../../DTOs/updateTastkDTO';
import { updateTaskFromDTO } from 'src/shared/helpers/updateTaskfromDTO';
import { ResourceNotFound } from 'src/application/errors/ResourceNotFoundError';



@Injectable()
export class TasksService {
  constructor(private readonly _taskRepository: TaskRepository) { }


  async create(taskDto: CreateTaskDTO): Promise<ResponseResult<Task>> {

    const task = createTaskFromDTO(taskDto)
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

  async update(id: string, taskDTO: UpdateTaskDTO): Promise<ResponseResult<Task>> {

    const task = updateTaskFromDTO(taskDTO);
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
