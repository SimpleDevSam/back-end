import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResourceNotFound } from 'src/application/errors/ResourceNotFound';
import { News } from 'src/domain/entities/news';
import { NewsRepository } from 'src/infra/repositories/NewsRepository';
import { TaskRepository } from 'src/infra/repositories/TaskRepository';
import ResponseResult from 'src/shared/abstractions/Response';
import { DateHelper } from 'src/shared/helpers/dateHelper';
import transformKeywordsToQuery from 'src/shared/helpers/keywordsToUriEncoded';

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

        const daysAgoToTake = this.configService.get<string>('DAYS_TO_TAKE_NEWS')
        var date = DateHelper.getFormattedDate(Number(daysAgoToTake))

        var keywords = transformKeywordsToQuery(task.keywords)

        const news = await this.newsRepository.getNewsByTaskId(keywords, date)

        const response: ResponseResult<News[]> = {isSuccess: true, data:news}

        return response
    }

}
