import { UpdateTaskDTO } from "src/application/DTOs/updateTastkDTO";
import { Task } from "src/domain/entities/task";


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
