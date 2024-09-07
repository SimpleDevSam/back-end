import { UUID } from "crypto";
import { TaskStatus } from "src/domain/enums/taskStatus";

export interface UpdateTaskDTO {
    id:UUID,
    title:string,
    creationDate:Date,
    updatedDate:Date,
    keywords:string[],
    status: TaskStatus
}