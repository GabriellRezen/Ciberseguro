import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dtos/pagination-query.dto';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('categories')
  findAllCategories() {
    return this.contentService.findAllCategories();
  }

  @Get('highlights')
  findHighlights() {
    return this.contentService.findHighlights();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.contentService.findBySlug(slug);
  }

  @Get()
  findAllContent(@Query() query: PaginationQueryDto) {
    return this.contentService.findAllContent(query);
  }
}
