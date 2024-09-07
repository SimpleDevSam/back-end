import {
  Body, Controller, Get, Post, Param, Delete, Put, Query, HttpStatus,
  HttpException, ParseUUIDPipe
} from '@nestjs/common';
import { TasksService } from 'src/application/services/task.service';
import { ResourceNotFound } from 'src/application/errors/ResourceNotFound';
import ResponseType, { ResponseResult } from 'src/shared/abstractions/Response';
import { CreateTaskDTO } from 'src/application/DTOs/createTaskDTO';
import { Task } from 'src/domain/entities/task';
import { UpdateTaskDTO } from 'src/application/DTOs/updateTastkDTO';



@Controller('/task')
export class AppController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  async createTask(@Body() taskDTO: CreateTaskDTO): Promise<ResponseType<Task>> {
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
    @Query('limit') limit = 10,
    @Query('offset') offset = 0
  ): Promise<ResponseType<Task[]>> {
    return await this.tasksService.getAll(+limit, +offset);
  };

  @Get(':id')
  async getTaskById(@Param('id', new ParseUUIDPipe()) id: string): Promise<ResponseType<Task>> {
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
  async deleteTask(@Param('id', new ParseUUIDPipe()) id: string): Promise<ResponseType<Task>> {
    try {
      return await this.tasksService.delete(id);
    } catch (error) {
      if (error instanceof ResourceNotFound) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      }
    }
  }
}
