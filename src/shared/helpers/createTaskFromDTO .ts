import { CreateTaskDTO } from "@application/DTOs/createTaskDTO";
import { Task } from "@domain/entities/task";
import { v4 as uuidv4 } from "uuid";

export function createTaskFromDTO(dto: CreateTaskDTO): Task {

    const currentTimestamp = new Date();
    const uuid = uuidv4()

    return new Task(
        dto.title,
        dto.keywords,
        dto.status,
        currentTimestamp,
        currentTimestamp,
        uuid
    )
};
