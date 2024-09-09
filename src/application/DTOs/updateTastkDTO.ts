import { TaskStatus } from "@domain/enums/taskStatus";
import { UUID } from "crypto";


export interface UpdateTaskDTO {
    id:UUID,
    title:string,
    creationDate:Date,
    updatedDate:Date,
    keywords:string[],
    status: TaskStatus
}