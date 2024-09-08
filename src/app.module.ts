import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksService } from './application/services/task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './domain/taskSchema';
import { DatabaseModule } from './infra/database/database.module';
import { TaskRepository } from './infra/repositories/TaskRepository';
import { AppController } from './controllers/task.controller';
import { Task } from './domain/entities/task';

@Module({
  imports: [DatabaseModule, MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),ConfigModule.forRoot({isGlobal: true}), DatabaseModule],
  controllers: [AppController],
  providers: [TasksService,TaskRepository],
})
export class AppModule {}
