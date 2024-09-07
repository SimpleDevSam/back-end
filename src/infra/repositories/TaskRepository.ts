import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ITaskRepository } from "src/domain/contracts/ITaskRepository";
import { Task } from "src/domain/entities/task";

@Injectable()
export class TaskRepository implements ITaskRepository {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async findOneById(taskId: string): Promise<Task> {
        return await this.taskModel.findOne({ id: taskId }).exec();
    }
    async findAll(limit: number, offset: number): Promise<Task[]> {
        return this.taskModel.find({})
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .exec();
    };

    async create(task: Task): Promise<Task> {
        return await this.taskModel.create(task);
    };
    async deleteOneById(taskId: string): Promise<Task> {
        return await this.taskModel.findOneAndDelete({ id: taskId }).exec();
    };

    async updateOneById(taskId: string, task: Task): Promise<Task> {
        await this.taskModel.validate(task);
        return await this.taskModel.findOneAndUpdate({ id: taskId }, task, {new:true}).exec();
    }

}