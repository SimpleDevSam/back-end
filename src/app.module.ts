import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksService } from './application/services/tasks/task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './domain/taskSchema';
import { DatabaseModule } from './infra/database/database.module';
import { TaskRepository } from './infra/repositories/TaskRepository';
import { TasksController } from './controllers/tasks/task.controller';
import { Task } from './domain/entities/task';
import { NewsService } from './application/services/news/news.service';
import { NewsRepository } from './infra/repositories/NewsRepository';
import { NewsController } from './controllers/news/news.controller';

@Module({
  imports: [DatabaseModule, MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),ConfigModule.forRoot({isGlobal: true}), DatabaseModule],
  controllers: [TasksController, NewsController],
  providers: [TasksService,TaskRepository, NewsService, NewsRepository],
})
export class AppModule {}
