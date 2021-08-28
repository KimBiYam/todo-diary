import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SocialAccount } from '@src/entities';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';

describe('DiaryController', () => {
  let controller: DiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiaryController],
      providers: [
        { provide: DiaryService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: getRepositoryToken(SocialAccount), useValue: {} },
      ],
    }).compile();

    controller = module.get<DiaryController>(DiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
