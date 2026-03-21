import { Controller, Get } from '@nestjs/common';
import { SupportService } from './support.service';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get('resources')
  getResources() {
    return this.supportService.getResources();
  }

  @Get('faq')
  getFaq() {
    return this.supportService.getFaq();
  }

  @Get('emergency-guidance')
  getEmergencyGuidance() {
    return this.supportService.getEmergencyGuidance();
  }
}