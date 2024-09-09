import { UpdateTaskDTO } from "@application/DTOs/updateTastkDTO";
import { Task } from "@domain/entities/task";


export function updateTaskFromDTO(dto:UpdateTaskDTO): Task {

    const currentTimestamp = new Date();
    
    return new Task(
        dto.title,
        dto.keywords,
        dto.status,
        dto.creationDate,
        currentTimestamp,
        dto.id
    );
}
