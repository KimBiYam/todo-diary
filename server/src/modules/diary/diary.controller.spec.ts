import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Diary } from '@src/entities';
import { diary } from '@src/__fixtures__/diary/diary';
import { user } from '@src/__fixtures__/user/user';
import { mockDiaryService } from '@src/__mocks__/services/mock.diary.service';
import { mockUserService } from '@src/__mocks__/services/mock.user.service';
import { DeleteResult } from 'typeorm';
import { UserService } from '../user';
import { RequestUserDto } from '../user/dto';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import {
  CreateDiaryDto,
  DiariesExistsDatesDto,
  DiariesStatisticsRequestDto,
  GetDiariesDto,
  UpdateDiaryDto,
} from './dto';
import { DiariesStatisticsResponseDto } from './dto/diaries-statistics-response.dto';

describe('DiaryController', () => {
  let diaryController: DiaryController;
  let diaryService: DiaryService;
  let userService: UserService;

  let requestUserDto: RequestUserDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiaryController],
      providers: [
        mockDiaryService,
        mockUserService,
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    diaryController = module.get<DiaryController>(DiaryController);
    diaryService = module.get<DiaryService>(DiaryService);
    userService = module.get<UserService>(UserService);

    requestUserDto = {
      id: '1',
      displayName: 'displayName',
    };

    userService.findUserById = jest.fn().mockResolvedValue(user);
  });

  it('should be defined', () => {
    expect(diaryController).toBeDefined();
  });

  describe('findMyDiaries', () => {
    it('return serialized diaries when succeed find my diaries', async () => {
      // given
      const getDiariesDto: GetDiariesDto = {
        limit: 10,
        page: 1,
      };

      const diary = new Diary();
      diary.id = '1';
      diary.createdAt = new Date('2020-01-01');
      diary.title = 'title';
      diary.isFinished = false;
      diary.diaryMeta = {
        id: '1',
        content: 'content',
        diary,
      };

      diaryService.findMyDiaries = jest.fn().mockResolvedValue([diary]);

      // when
      const serialized = [
        {
          id: '1',
          createdAt: new Date('2020-01-01'),
          isFinished: false,
          title: 'title',
          content: 'content',
        },
      ];

      const result = await diaryController.findMyDiaries(
        requestUserDto,
        getDiariesDto,
      );

      // then
      expect(result).toEqual({ diaries: serialized });
    });
  });

  describe('getDiariesStatisticsByYear', () => {
    it('return diaries statistics when succeed get diaries statistics', async () => {
      // given
      const diariesStatisticsRequestDto: DiariesStatisticsRequestDto = {
        year: 2020,
      };

      const diariesStatisticsResponseDto: DiariesStatisticsResponseDto = {
        diariesStatisticsByYear: [
          {
            month: 1,
            finishedDiariesCount: 5,
            totalCount: 10,
          },
        ],
      };

      diaryService.getDiariesStatisticsByYear = jest
        .fn()
        .mockResolvedValue(diariesStatisticsResponseDto);

      // when
      const result = await diaryController.getDiariesStatisticsByYear(
        user,
        diariesStatisticsRequestDto,
      );

      // then
      expect(result).toEqual(diariesStatisticsResponseDto);
    });
  });

  describe('getDatesTheDiaryExists', () => {
    it('return dates when succeed find dates the diary exists', async () => {
      // given
      const diariesExistsDatesDto: DiariesExistsDatesDto = {
        year: 2020,
        month: 1,
      };

      const dates = [1, 2, 3, 4, 5];

      diaryService.getDatesTheDiaryExists = jest.fn().mockResolvedValue(dates);

      // when
      const result = await diaryController.getDatesTheDiaryExists(
        requestUserDto,
        diariesExistsDatesDto,
      );

      // then
      expect(result).toEqual({ dates });
    });
  });

  describe('createDiary', () => {
    it('return serialized diary when succeed create diary', async () => {
      // given
      const createDiaryDto: CreateDiaryDto = {
        title: 'title',
        content: 'content',
      };

      const diary = new Diary();
      diary.id = '1';
      diary.createdAt = new Date('2020-01-01');
      diary.title = 'title';
      diary.isFinished = false;
      diary.diaryMeta = {
        id: '1',
        content: 'content',
        diary,
      };

      const createDiarySpy = jest
        .spyOn(diaryService, 'createDiary')
        .mockResolvedValue(diary);

      // when
      const result = await diaryController.createDiary(
        requestUserDto,
        createDiaryDto,
      );

      // then
      const serialized = {
        id: '1',
        createdAt: new Date('2020-01-01'),
        isFinished: false,
        title: 'title',
        content: 'content',
      };

      expect(createDiarySpy).toBeCalledWith(requestUserDto, createDiaryDto);
      expect(result).toEqual({ diary: serialized });
    });
  });

  describe('findMyDiary', () => {
    it('return serialized diary when succeed find my diary', async () => {
      // given
      const diaryId = 1;

      const diary = new Diary();
      diary.id = '1';
      diary.createdAt = new Date('2020-01-01');
      diary.title = 'title';
      diary.isFinished = false;
      diary.diaryMeta = {
        id: '1',
        content: 'content',
        diary,
      };

      diaryService.findMyDiary = jest.fn().mockResolvedValue(diary);

      // when
      const result = await diaryController.findMyDiary(requestUserDto, diaryId);

      // then
      const serialized = {
        id: '1',
        createdAt: new Date('2020-01-01'),
        isFinished: false,
        title: 'title',
        content: 'content',
      };

      expect(result).toEqual({ diary: serialized });
    });
  });

  describe('updateMyDiary', () => {
    it('return diary when succeed update my diary', async () => {
      // given
      const diaryId = 1;

      const updateDiaryDto: UpdateDiaryDto = {
        title: 'updated title',
        isFinished: true,
        content: 'updated content',
      };

      const { title, isFinished, content } = updateDiaryDto;

      const updatedDiary: Diary = diary;
      updatedDiary.title = title;
      updatedDiary.isFinished = isFinished;
      updatedDiary.diaryMeta.content = content;

      diaryService.updateMyDiary = jest.fn().mockResolvedValue(updatedDiary);

      // when
      const result = await diaryController.updateMyDiary(
        requestUserDto,
        updateDiaryDto,
        diaryId,
      );

      // then
      expect(result).toEqual({ diary });
      expect(result.diary.title).toEqual(title);
      expect(result.diary.isFinished).toEqual(isFinished);
      expect(result.diary.diaryMeta.content).toEqual(content);
    });

    it('throw error when failed update my diary', async () => {
      // given
      const updateDiaryDto: UpdateDiaryDto = {
        title: 'updated title',
        isFinished: true,
        content: 'updated content',
      };

      const diaryId = 1;

      diaryService.updateMyDiary = jest
        .fn()
        .mockRejectedValue(new BadRequestException());

      // when

      // then
      await expect(
        diaryController.updateMyDiary(requestUserDto, updateDiaryDto, diaryId),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('deleteMyDiary', () => {
    it('return msg when succeed delete my diary', async () => {
      // given
      const diaryId = 1;

      const deleteMyDiarySpy = jest
        .spyOn(diaryService, 'deleteMyDiary')
        .mockResolvedValue(new DeleteResult());

      // when
      const result = await diaryController.deleteMyDiary(
        requestUserDto,
        diaryId,
      );

      // then
      expect(result.msg).toEqual('Successfully deleted your diary');
      expect(deleteMyDiarySpy).toBeCalledWith(user, diaryId);
    });

    it('throw error when failed delete my diary', async () => {
      // given
      const diaryId = 1;

      diaryService.deleteMyDiary = jest
        .fn()
        .mockRejectedValue(new BadRequestException());

      // when

      // then
      await expect(
        diaryController.deleteMyDiary(requestUserDto, diaryId),
      ).rejects.toThrowError(BadRequestException);
    });
  });
});
