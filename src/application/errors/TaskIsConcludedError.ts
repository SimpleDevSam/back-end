export class TaskIsConcludedError extends Error {
    constructor() {
        super ('A task já está concluída, não é possível buscar assuntos')
    }
}