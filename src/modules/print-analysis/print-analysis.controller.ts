import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { multerImageConfig } from '../../common/utils/upload/multer.config';
import { PrintAnalysisService } from './print-analysis.service';

@ApiTags('Print Analysis')
@Controller('print-analysis')
export class PrintAnalysisController {
  constructor(private readonly printAnalysisService: PrintAnalysisService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload and analyze a screenshot/image' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', multerImageConfig))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  upload(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: { userId: string } | null,
  ) {
    return this.printAnalysisService.uploadAndAnalyze(file, user?.userId);
  }

  @Post(':id/analyze')
  analyze(@Param('id') id: string) {
    return this.printAnalysisService.analyzeExistingEvidence(id);
  }

  @Get(':id/result')
  getResult(@Param('id') id: string) {
    return this.printAnalysisService.getResult(id);
  }
}
