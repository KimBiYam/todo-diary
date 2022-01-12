import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Diary } from '@src/entities';
import { diary } from '@src/__fixtures__/diary/diary';
import { user } from '@src/__fixtures__/user/user';
import { Connection } from 'typeorm';
import { UserService } from '../user';
import { DiaryRepository } from './diary.repository';
import { DiaryService } from './diary.service';
import {
  CreateDiaryDto,
  DiariesExistsDatesDto,
  GetDiariesDto,
  UpdateDiaryDto,
} from './dto';
import { DiariesStatisticsDto } from './dto/diaries-statistics.dto';

describe('DiaryService', () => {
  let diaryService: DiaryService;
  let diaryRepository: DiaryRepository;

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
    diaryRepository = module.get<DiaryRepository>(DiaryRepository);
  });

  it('should be defined', () => {
    expect(diaryService).toBeDefined();
  });

  describe('findMyDiaries', () => {
    it('should return diaries by date when defined createdDate in getDiariesDto', async () => {
      // given
      const getDiariesDto: GetDiariesDto = {
        limit: 10,
        page: 1,
        createdDate: '2020-01-01',
      };

      const diary1 = new Diary();
      diary1.createdAt = new Date('2020-01-01');

      const diary2 = new Diary();
      diary2.createdAt = new Date('2020-01-01');

      const diaries: Diary[] = [diary1, diary2];

      diaryRepository.findMyDiariesByDate = jest
        .fn()
        .mockResolvedValue(diaries);

      // when
      const result = await diaryService.findMyDiaries(user, getDiariesDto);

      // then
      expect(result).toEqual(diaries);
    });

    it('should return diaries when undefined createdDate in getDiariesDto', async () => {
      // given
      const getDiariesDto: GetDiariesDto = {
        limit: 10,
        page: 1,
        createdDate: undefined,
      };

      const diary1 = new Diary();
      diary1.createdAt = new Date('2020-01-01');

      const diary2 = new Diary();
      diary2.createdAt = new Date('2020-02-01');

      const diaries: Diary[] = [diary1, diary2];

      diaryRepository.findMyDiaries = jest.fn().mockResolvedValue(diaries);

      // when
      const result = await diaryService.findMyDiaries(user, getDiariesDto);

      // then
      expect(result).toEqual(diaries);
    });
  });

  describe('findMyDiary', () => {
    it('should return diary when succeed find my diary', async () => {
      //given
      const diaryId = 1;

      diaryRepository.findMyDiary = jest.fn().mockResolvedValue(diary);

      //when
      const result = await diaryService.findMyDiary(user, diaryId);

      //then
      expect(result).toEqual(diary);
    });

    it('should throw exception when failed find my diary', async () => {
      //given
      const diaryId = 1;

      diaryRepository.findMyDiary = jest.fn().mockResolvedValue(null);

      //when

      //then
      await expect(
        diaryService.findMyDiary(user, diaryId),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findDiariesByYear', () => {
    it('should return diaries by year', async () => {
      // given
      const year = 2020;

      const diary1 = new Diary();
      diary1.createdAt = new Date('2020-01-01');

      const diary2 = new Diary();
      diary2.createdAt = new Date('2020-12-01');

      const diaries: Diary[] = [diary1, diary2];

      diaryRepository.find = jest.fn().mockResolvedValue(diaries);

      // when
      const result = await diaryService.findDiariesByYear(user, year);

      // then
      expect(result).toEqual(diaries);
    });
  });

  describe('findDiariesByMonth', () => {
    it('should return diaries by month', async () => {
      // given
      const year = 2020;
      const month = 1;

      const diary1 = new Diary();
      diary1.createdAt = new Date('2020-01-01');

      const diary2 = new Diary();
      diary2.createdAt = new Date('2020-01-10');

      const diaries: Diary[] = [diary1, diary2];

      diaryRepository.find = jest.fn().mockResolvedValue(diaries);

      // when
      const result = await diaryService.findDiariesByMonth(user, year, month);

      // then
      expect(result).toEqual(diaries);
    });
  });

  describe('createDiary', () => {
    it('should return diary when succeed create diary', async () => {
      // given
      const createDiaryDto: CreateDiaryDto = {
        title: 'title',
        content: 'content',
      };

      diaryRepository.saveDiary = jest.fn().mockResolvedValue(diary);

      // when
      const result = await diaryService.createDiary(user, createDiaryDto);

      // then
      expect(result).toEqual(diary);
    });
  });

  describe('getDatesTheDiaryExists', () => {
    it('should return dates the diary exists', async () => {
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
    it('should return grouped diaries by month', () => {
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
    it('should return diaries statistics by diaries', () => {
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
