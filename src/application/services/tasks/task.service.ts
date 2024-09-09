import { CreateTaskDTO } from "@application/DTOs/createTaskDTO";
import { UpdateTaskDTO } from "@application/DTOs/updateTastkDTO";
import { ResourceNotFound } from "@application/errors/ResourceNotFoundError";
import { Task } from "@domain/entities/task";
import { TaskRepository } from "@infra/repositories/TaskRepository";
import { Injectable } from "@nestjs/common";
import ResponseResult from "@shared/abstractions/Response";
import { createTaskFromDTO } from "@shared/helpers/createTaskFromDTO ";
import { updateTaskFromDTO } from "@shared/helpers/updateTaskfromDTO";



@Injectable()
export class TasksService {
  constructor(private readonly _taskRepository: TaskRepository) { }


  async create(taskDto: CreateTaskDTO): Promise<ResponseResult<Task>> {

    const task = createTaskFromDTO(taskDto)
    const createdTask = await this._taskRepository.create(task);
    const response: ResponseResult<Task> = { isSuccess: true , data:createdTask}
    return response
  }

  async getAll(): Promise<ResponseResult<Task[]>> {
    const tasks = await this._taskRepository.findAll();
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
