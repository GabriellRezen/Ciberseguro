import { Module } from '@nestjs/common';
import { PspCentersController } from './psp-centers.controller';
import { PspCentersService } from './psp-centers.service';

@Module({
  controllers: [PspCentersController],
  providers: [PspCentersService]
})
export class PspCentersModule {}
