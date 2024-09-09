import { ResourceNotFound } from "@application/errors/ResourceNotFoundError"
import { TaskIsConcludedError } from "@application/errors/TaskIsConcludedError"
import { News } from "@domain/entities/news"
import { TaskStatus } from "@domain/enums/taskStatus"
import { NewsRepository } from "@infra/repositories/NewsRepository"
import { TaskRepository } from "@infra/repositories/TaskRepository"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import ResponseResult from "@shared/abstractions/Response"
import { DateHelper } from "@shared/helpers/dateHelper"
import transformKeywordsToQuery from "@shared/helpers/keywordsToUriEncoded"

@Injectable()
export class NewsService {
    constructor(private readonly newsRepository: NewsRepository,
        private readonly taskRepository: TaskRepository,
        private readonly configService: ConfigService
    ) { }


    async getNews(taskId: string): Promise<ResponseResult<News[]>> {

        const task = await this.taskRepository.findOneById(taskId)

        if (!task) {
            throw new ResourceNotFound()
        }

        if (Number(task.status) === TaskStatus.Concluída){
            throw new TaskIsConcludedError()
        }

        const daysAgoToTake = this.configService.get<string>('DAYS_TO_TAKE_NEWS')
        var date = DateHelper.getFormattedDate(Number(daysAgoToTake))

        var keywords = transformKeywordsToQuery(task.keywords)

        const news = await this.newsRepository.getNewsByTaskId(keywords, date)

        const response: ResponseResult<News[]> = {isSuccess: true, data:news}

        return response
    }

}
