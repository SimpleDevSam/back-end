import { NewsService } from "@application/services/news/news.service";
import { TasksService } from "@application/services/tasks/task.service";
import { Task } from "@domain/entities/task";
import { TaskSchema } from "@domain/taskSchema";
import { DatabaseModule } from "@infra/database/database.module";
import { NewsRepository } from "@infra/repositories/NewsRepository";
import { TaskRepository } from "@infra/repositories/TaskRepository";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from '@nestjs/common';
import { NewsController } from "@controllers/news/news.controller";
import { TasksController } from "@controllers/tasks/task.controller";


@Module({
  imports: [DatabaseModule, MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),ConfigModule.forRoot({isGlobal: true}), DatabaseModule],
  controllers: [TasksController, NewsController],
  providers: [TasksService,TaskRepository, NewsService, NewsRepository],
})
export class AppModule {}
