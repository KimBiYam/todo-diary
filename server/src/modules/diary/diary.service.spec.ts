import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Diary } from '@src/entities';
import { Connection } from 'typeorm';
import { UserService } from '../user';
import { DiaryRepository } from './diary.repository';
import { DiaryService } from './diary.service';

describe('DiaryService', () => {
  let service: DiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiaryService,
        { provide: UserService, useValue: {} },
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(DiaryRepository), useValue: {} },
      ],
    }).compile();

    service = module.get<DiaryService>(DiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDiariesStatistics', () => {
    it('return diaries statistics by diaries', () => {});
  });
});
