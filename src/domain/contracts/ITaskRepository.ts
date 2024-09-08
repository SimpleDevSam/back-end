import { Task } from "../entities/task"


export interface ITaskRepository {
    findOneById(id:string): Promise<Task>
    findAll(): Promise<Task[]>
    deleteOneById(taskId:string):Promise<Task>
    updateOneById(taskId:string,task: Task):Promise<Task>
}