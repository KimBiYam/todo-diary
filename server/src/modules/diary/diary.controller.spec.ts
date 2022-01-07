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
import { UpdateDiaryDto } from './dto';

describe('DiaryController', () => {
  let diaryController: DiaryController;
  let diaryService: DiaryService;
  let userService: UserService;

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
  });

  it('should be defined', () => {
    expect(diaryController).toBeDefined();
  });

  describe('updateMyDiary', () => {
    it('return diary when succeed update my diary', async () => {
      //given
      const requestUserDto: RequestUserDto = {
        id: '1',
        displayName: 'displayName',
      };

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

      userService.findUserById = jest.fn().mockResolvedValue(user);
      diaryService.updateMyDiary = jest.fn().mockResolvedValue(updatedDiary);

      //when
      const result = await diaryController.updateMyDiary(
        requestUserDto,
        updateDiaryDto,
        diaryId,
      );

      //then
      expect(result).toEqual({ diary });
      expect(result.diary.title).toEqual(title);
      expect(result.diary.isFinished).toEqual(isFinished);
      expect(result.diary.diaryMeta.content).toEqual(content);
    });

    it('throw error when failed update my diary', async () => {
      //given
      const requestUserDto: RequestUserDto = {
        id: '1',
        displayName: 'displayName',
      };

      const updateDiaryDto: UpdateDiaryDto = {
        title: 'updated title',
        isFinished: true,
        content: 'updated content',
      };

      const diaryId = 1;

      userService.findUserById = jest.fn().mockResolvedValue(user);
      diaryService.updateMyDiary = jest
        .fn()
        .mockRejectedValue(new BadRequestException());

      //when

      //then
      await expect(
        diaryController.updateMyDiary(requestUserDto, updateDiaryDto, diaryId),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('deleteMyDiary', () => {
    it('return msg when succeed delete my diary', async () => {
      //given
      const requestUserDto: RequestUserDto = {
        id: '1',
        displayName: 'displayName',
      };

      const diaryId = 1;

      userService.findUserById = jest.fn().mockResolvedValue(user);

      const deleteMyDiarySpy = jest
        .spyOn(diaryService, 'deleteMyDiary')
        .mockResolvedValue(new DeleteResult());

      //when
      const result = await diaryController.deleteMyDiary(
        requestUserDto,
        diaryId,
      );

      //then
      expect(result.msg).toEqual('Successfully deleted your diary');
      expect(deleteMyDiarySpy).toBeCalledWith(user, diaryId);
    });

    it('throw error when failed delete my diary', async () => {
      //given
      const requestUserDto: RequestUserDto = {
        id: '1',
        displayName: 'displayName',
      };

      const diaryId = 1;

      userService.findUserById = jest.fn().mockResolvedValue(user);
      diaryService.deleteMyDiary = jest
        .fn()
        .mockRejectedValue(new BadRequestException());

      //when

      //then
      await expect(
        diaryController.deleteMyDiary(requestUserDto, diaryId),
      ).rejects.toThrowError(BadRequestException);
    });
  });
});
