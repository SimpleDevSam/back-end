import { News } from "../entities/news"


export interface INewsRepository {
    getNewsByTaskId(keywords:string,date:string): Promise<News[]>
}