import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Diary, DiaryMeta } from '@src/entities';
import { UserService } from '../user';
import { DiaryService } from './diary.service';

describe('DiaryService', () => {
  let service: DiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiaryService,
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Diary),
          useValue: {},
        },
        {
          provide: getRepositoryToken(DiaryMeta),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DiaryService>(DiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
