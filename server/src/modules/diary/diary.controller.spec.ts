import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';

describe('DiaryController', () => {
  let controller: DiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiaryController],
      providers: [
        { provide: DiaryService, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    controller = module.get<DiaryController>(DiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
