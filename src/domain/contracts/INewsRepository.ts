import { News } from "@domain/entities/news";

export interface INewsRepository {
    getNewsByTaskId(keywords:string,date:string): Promise<News[]>
}