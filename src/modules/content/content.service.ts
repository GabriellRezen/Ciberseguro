import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dtos/pagination-query.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategories() {
    return this.prisma.contentCategory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllContent(query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.content.findMany({
        where: { isPublished: true },
        include: {
          category: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.content.count({
        where: { isPublished: true },
      }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findHighlights() {
    return this.prisma.content.findMany({
      where: { isPublished: true },
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
      },
    });
  }

  async findBySlug(slug: string) {
    const content = await this.prisma.content.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!content) {
      throw new NotFoundException('Content not found');
    }

    return content;
  }
}
