import { TaskStatus } from "../enums/taskStatus";

export class Task {
    id: string;
    title: string;
    keywords: string[];
    status: TaskStatus;
    creationDate: Date;
    updatedDate: Date;

    constructor( title: string, keywords: string[], status: TaskStatus, creationDate: Date, updatedDate: Date,id: string) {
        this.id=id
        this.title = title;
        this.keywords = keywords;
        this.status = status;
        this.creationDate = creationDate;
        this.updatedDate = updatedDate;
    }
}