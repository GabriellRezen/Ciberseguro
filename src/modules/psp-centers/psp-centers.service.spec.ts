import { Test, TestingModule } from '@nestjs/testing';
import { PspCentersService } from './psp-centers.service';

describe('PspCentersService', () => {
  let service: PspCentersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PspCentersService],
    }).compile();

    service = module.get<PspCentersService>(PspCentersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
