import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SupportService {
  constructor(private readonly prisma: PrismaService) {}

  async getResources() {
    return this.prisma.supportResource.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getFaq() {
    return this.prisma.faqItem.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    });
  }

  async getEmergencyGuidance() {
    return {
      title: 'Orientação imediata',
      steps: [
        'Preserva provas digitais como capturas de ecrã e links.',
        'Evita responder de forma impulsiva.',
        'Bloqueia e reporta o agressor na plataforma.',
        'Procura apoio de um adulto de confiança ou autoridade.',
      ],
    };
  }
}
