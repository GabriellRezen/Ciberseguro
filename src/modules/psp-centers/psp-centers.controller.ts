import { Controller, Get, Param, Query } from '@nestjs/common';
import { NearbyCentersQueryDto } from './dto/nearby-centers-query.dto';
import { PspCentersService } from './psp-centers.service';

@Controller('psp-centers')
export class PspCentersController {
  constructor(private readonly pspCentersService: PspCentersService) {}

  @Get()
  findAll() {
    return this.pspCentersService.findAll();
  }

  @Get('nearby')
  findNearby(@Query() query: NearbyCentersQueryDto) {
    return this.pspCentersService.findNearby(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pspCentersService.findOne(id);
  }
}