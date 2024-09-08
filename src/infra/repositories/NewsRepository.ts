import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { INewsRepository } from "src/domain/contracts/INewsRepository";
import { News } from "src/domain/entities/news";

@Injectable()
export class NewsRepository implements INewsRepository {

    constructor(private configService: ConfigService) { }

    async getNewsByTaskId(keywords:string, date: string): Promise<News[]> {
        var response = await axios.get(this.configService.get<string>('NEWS_API_URL'),
            {
                params: {
                    q: keywords,
                    from: date,
                    apiKey: this.configService.get<string>('NEWS_API_KEY'),
                    pageSize: 10,
                    language:'pt'
                }
            })

        return response.data.articles
    }


}