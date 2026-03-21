import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getHealth() {
    return {
      status: 'ok',
      service: 'psp-cyber-backend',
      timestamp: new Date().toISOString(),
    };
  }
}