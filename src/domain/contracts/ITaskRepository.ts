import { Task } from "src/domain/taskSchema";

export interface ITaskRepository {
    findOneById(id:string): Promise<Task>
    findAll(limit: number, offset: number): Promise<Task[]>
    deleteOneById(taskId:string):Promise<Task>
    updateOneById(taskId:string,task: Task):Promise<Task>
}