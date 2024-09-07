import { TaskStatus } from "src/domain/enums/taskStatus";

export interface CreateTaskDTO {
    title:string,
    keywords:string[],
    status: TaskStatus
}