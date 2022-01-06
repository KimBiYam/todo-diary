import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { user } from '@src/__fixtures__/user/user';
import { mockDiaryService } from '@src/__mocks__/services/mock.diary.service';
import { mockUserService } from '@src/__mocks__/services/mock.user.service';
import { DeleteResult } from 'typeorm';
import { UserService } from '../user';
import { RequestUserDto } from '../user/dto';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';

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
  });
});
