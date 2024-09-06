import { Module } from '@nestjs/common';
import { TasksService } from './application/services/task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './domain/taskSchema';
import { DatabaseModule } from './infra/database/database.module';
import  'dotenv';
import { TaskRepository } from './infra/repositories/TaskRepository';
import { AppController } from './controllers/task.controller';

@Module({
  imports: [DatabaseModule, MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), DatabaseModule],
  controllers: [AppController],
  providers: [TasksService,TaskRepository],
})
export class AppModule {}
