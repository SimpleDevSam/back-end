import { ResourceNotFound } from "@application/errors/ResourceNotFoundError"
import { TaskIsConcludedError } from "@application/errors/TaskIsConcludedError"
import { NewsService } from "@application/services/news/news.service"
import { News } from "@domain/entities/news"
import { Controller, Get, Param, ParseUUIDPipe, HttpException, HttpStatus } from "@nestjs/common"
import ResponseResult from "@shared/abstractions/Response"


@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) { }

    @Get('/task/:id')
    async getTaskById(@Param('id', new ParseUUIDPipe()) id: string): Promise<ResponseResult<News[]>> {
      try {
        return await this.newsService.getNews(id)
      } catch (error) {
        if (error instanceof ResourceNotFound) {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
        if (error instanceof TaskIsConcludedError) {
          throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
        }
      }
    }
}
