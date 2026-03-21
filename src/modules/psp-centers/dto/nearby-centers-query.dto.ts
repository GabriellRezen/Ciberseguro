import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class NearbyCentersQueryDto {
  @ApiProperty({
    example: '38.7223',
  })
  @IsNumberString()
  lat: string;

  @ApiProperty({
    example: '-9.1393',
  })
  @IsNumberString()
  lng: string;
}
