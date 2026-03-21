import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { envValidationSchema } from './config/env.validation';
import { AppController } from './app.controller';
import { GeminiModule } from './integrations/gemini/gemini.module';
import { AiTriageModule } from './modules/ai-triage/ai-triage.module';
import { ChatModule } from './modules/chat/chat.module';
import { ContentModule } from './modules/content/content.module';
import { HealthModule } from './modules/health/health.module';
import { PrintAnalysisModule } from './modules/print-analysis/print-analysis.module';
import { PspCentersModule } from './modules/psp-centers/psp-centers.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SupportModule } from './modules/support/support.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    GeminiModule,
    HealthModule,
    ContentModule,
    PspCentersModule,
    SupportModule,
    ChatModule,
    AiTriageModule,
    PrintAnalysisModule,
    ReportsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}