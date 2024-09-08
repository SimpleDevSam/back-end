import { Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe } from '@nestjs/common';
import { ResourceNotFound } from 'src/application/errors/ResourceNotFound';
import { NewsService } from 'src/application/services/news/news.service';
import { News } from 'src/domain/entities/news';
import ResponseResult from 'src/shared/abstractions/Response';

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
      }
    }
}
