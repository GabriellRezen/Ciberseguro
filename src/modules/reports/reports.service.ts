import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportType } from '@prisma/client';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReportDto, userId?: string) {
    return this.prisma.report.create({
      data: {
        userId,
        type: dto.type as ReportType,
        description: dto.description,
        isAnonymous: dto.isAnonymous,
        analysisRequestId: dto.analysisRequestId,
      },
    });
  }

  async findOne(id: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        analysisRequest: true,
      },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }

  async update(id: string, dto: UpdateReportDto) {
    await this.ensureExists(id);

    return this.prisma.report.update({
      where: { id },
      data: {
        ...(dto.type ? { type: dto.type as ReportType } : {}),
        ...(dto.description ? { description: dto.description } : {}),
        ...(dto.isAnonymous !== undefined
          ? { isAnonymous: dto.isAnonymous }
          : {}),
        ...(dto.analysisRequestId
          ? { analysisRequestId: dto.analysisRequestId }
          : {}),
      },
    });
  }

  async submit(id: string) {
    await this.ensureExists(id);

    return this.prisma.report.update({
      where: { id },
      data: {
        status: 'submitted',
      },
    });
  }

  private async ensureExists(id: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }
}
