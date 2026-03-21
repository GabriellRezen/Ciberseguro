import { Test, TestingModule } from '@nestjs/testing';
import { PspCentersController } from './psp-centers.controller';

describe('PspCentersController', () => {
  let controller: PspCentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PspCentersController],
    }).compile();

    controller = module.get<PspCentersController>(PspCentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
