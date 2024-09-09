import { TaskStatus } from "@domain/enums/taskStatus";


export interface CreateTaskDTO {
    title:string,
    keywords:string[],
    status: TaskStatus
}