import { CreateTaskDTO } from "@application/DTOs/createTaskDTO";
import { UpdateTaskDTO } from "@application/DTOs/updateTastkDTO";
import { ResourceNotFound } from "@application/errors/ResourceNotFoundError";
import { TasksService } from "@application/services/tasks/task.service";
import { Task } from "@domain/entities/task";
import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, ParseUUIDPipe, Put, Delete } from "@nestjs/common";
import ResponseResult from "@shared/abstractions/Response";



@Controller('/task')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async createTask(@Body() taskDTO: CreateTaskDTO): Promise<ResponseResult<Task>> {
    try {
      return await this.tasksService.create(taskDTO);
    } catch (error) {
      if (error._message === 'Task validation failed') {
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get()
  async getAllTasks(
  ): Promise<ResponseResult<Task[]>> {
    return await this.tasksService.getAll();
  };

  @Get(':id')
  async getTaskById(@Param('id', new ParseUUIDPipe()) id: string): Promise<ResponseResult<Task>> {
    try {
      return await this.tasksService.getOne(id);
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      }
    }
  }

  @Put(':id')
  async updateTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() taskDTO: UpdateTaskDTO
  ): Promise<ResponseResult<Task>> {
    try {
      return await this.tasksService.update(id, taskDTO);
    } catch (error) {

      if (error._message === 'Validation failed') {
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      }

      if (error instanceof ResourceNotFound) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id', new ParseUUIDPipe()) id: string): Promise<ResponseResult<Task>> {
    try {
      return await this.tasksService.delete(id);
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      }
    }
  }
}
