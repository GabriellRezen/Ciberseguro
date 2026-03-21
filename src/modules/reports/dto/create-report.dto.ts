import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum ReportTypeDto {
  cyberbullying = 'cyberbullying',
  harassment = 'harassment',
  threat = 'threat',
  image_exposure = 'image_exposure',
  impersonation = 'impersonation',
  other = 'other',
}

export class CreateReportDto {
  @ApiProperty({
    enum: ReportTypeDto,
    example: ReportTypeDto.impersonation,
  })
  @IsEnum(ReportTypeDto)
  type: ReportTypeDto;

  @ApiProperty({
    example:
      'Criaram uma conta falsa com a minha imagem e estão a usá-la para me gozar.',
  })
  @IsString()
  @MinLength(5)
  description: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isAnonymous: boolean;

  @ApiPropertyOptional({
    example: 'uuid-analysis-id',
  })
  @IsOptional()
  @IsString()
  analysisRequestId?: string;
}
