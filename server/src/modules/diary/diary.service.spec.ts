import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Diary } from '@src/entities';
import { user } from '@src/__fixtures__/user/user';
import { Connection } from 'typeorm';
import { UserService } from '../user';
import { DiaryRepository } from './diary.repository';
import { DiaryService } from './diary.service';
import { DiariesExistsDatesDto } from './dto';
import { DiariesStatisticsDto } from './dto/diaries-statistics.dto';

describe('DiaryService', () => {
  let diaryService: DiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiaryService,
        { provide: UserService, useValue: {} },
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(DiaryRepository), useValue: {} },
      ],
    }).compile();

    diaryService = module.get<DiaryService>(DiaryService);
  });

  it('should be defined', () => {
    expect(diaryService).toBeDefined();
  });

  describe('getDatesTheDiaryExists', () => {
    it('return dates the diary exists', async () => {
      // given
      const diariesExistsDatesDto: DiariesExistsDatesDto = {
        year: 2020,
        month: 1,
      };

      const diary1 = new Diary();
      diary1.createdAt = new Date('2020-01-01');

      const diary2 = new Diary();
      diary2.createdAt = new Date('2020-01-10');

      const diary3 = new Diary();
      diary3.createdAt = new Date('2020-01-20');

      const diaries: Diary[] = [diary1, diary2, diary3];

      diaryService.findDiariesByMonth = jest.fn().mockResolvedValue(diaries);

      // when
      const result = await diaryService.getDatesTheDiaryExists(
        user,
        diariesExistsDatesDto,
      );

      // then
      const expected = [1, 10, 20];

      expect(result).toEqual(expected);
    });
  });

  describe('groupDiariesByMonth', () => {
    it('return grouped diaries by month', () => {
      // given
      const diary1 = new Diary();
      diary1.createdAt = new Date('2020-01-01');

      const diary2 = new Diary();
      diary2.createdAt = new Date('2020-01-02');

      const diary3 = new Diary();
      diary3.createdAt = new Date('2020-02-01');

      const diaries: Diary[] = [diary1, diary2, diary3];

      // when
      const result = diaryService.groupDiariesByMonth(diaries);

      // then
      const expected = {
        '1': [diary1, diary2],
        '2': [diary3],
        '3': [],
        '4': [],
        '5': [],
        '6': [],
        '7': [],
        '8': [],
        '9': [],
        '10': [],
        '11': [],
        '12': [],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('getDiariesStatistics', () => {
    it('return diaries statistics by diaries', () => {
      // given
      const diary1 = new Diary();
      diary1.isFinished = true;

      const diary2 = new Diary();
      diary2.isFinished = false;

      const diaries: Diary[] = [diary1, diary2];

      // when
      const result = diaryService.getDiariesStatistics(diaries);

      // then
      const expected: DiariesStatisticsDto = {
        totalCount: 2,
        finishedDiariesCount: 1,
      };

      expect(result).toEqual(expected);
    });
  });
});
