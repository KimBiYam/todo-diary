import { Test, TestingModule } from '@nestjs/testing';
import { Diary, DiaryMeta } from '@src/entities';
import { diaries } from '@src/test/__fixtures__/diary/diaries';
import { diary } from '@src/test/__fixtures__/diary/diary';
import { user } from '@src/test/__fixtures__/user/user';
import { QueryFailedError } from 'typeorm';
import { DiaryRepository } from './diary.repository';
import { GetDiariesDto } from './dto';

describe('DiaryRepository', () => {
  let diaryRepository: DiaryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiaryRepository],
    }).compile();

    diaryRepository = module.get<DiaryRepository>(DiaryRepository);
  });

  it('should be defined', () => {
    expect(diaryRepository).toBeDefined();
  });

  describe('findMyDiary', () => {
    it('should return diary when succeed', async () => {
      // given
      const id = 1;

      const leftJoinAndSelect = jest.fn().mockReturnThis();
      const select = jest.fn().mockReturnThis();
      const where = jest.fn().mockReturnThis();
      const getOne = jest.fn().mockResolvedValue(diary);

      diaryRepository.createQueryBuilder = jest.fn().mockImplementation(() => ({
        leftJoinAndSelect,
        select,
        where,
        getOne,
      }));

      // when
      const result = await diaryRepository.findMyDiary(user, id);

      // then
      expect(leftJoinAndSelect).toBeCalledWith('diary.user', 'user');
      expect(leftJoinAndSelect).toBeCalledWith('diary.diaryMeta', 'diary_meta');
      expect(select).toBeCalledWith(['diary', 'diary_meta', 'user']);
      expect(where).toBeCalledWith('diary.user', { user });
      expect(where).toBeCalledWith('diary.id = :id', { id });
      expect(result).toEqual(diary);
    });
  });

  describe('findMyDiaries', () => {
    it('should return my diaries when succeed', async () => {
      // given
      const limit = 10;
      const page = 1;

      const getDiariesDto: GetDiariesDto = { limit, page };

      const leftJoinAndSelect = jest.fn().mockReturnThis();
      const select = jest.fn().mockReturnThis();
      const where = jest.fn().mockReturnThis();
      const orderBy = jest.fn().mockReturnThis();
      const skip = jest.fn().mockReturnThis();
      const take = jest.fn().mockReturnThis();
      const getMany = jest.fn().mockResolvedValue(diaries);

      diaryRepository.createQueryBuilder = jest.fn().mockImplementation(() => ({
        leftJoinAndSelect,
        select,
        where,
        orderBy,
        skip,
        take,
        getMany,
      }));

      // when
      const result = await diaryRepository.findMyDiaries(user, getDiariesDto);

      // then
      expect(leftJoinAndSelect).toBeCalledWith('diary.diaryMeta', 'diary_meta');
      expect(select).toBeCalledWith(['diary', 'diary_meta']);
      expect(where).toBeCalledWith('diary.user_id = :userId', {
        userId: user.id,
      });
      expect(orderBy).toBeCalledWith('diary.createdAt', 'DESC');
      expect(skip).toBeCalledWith((page - 1) * limit);
      expect(take).toBeCalledWith(limit);
      expect(result).toEqual(diaries);
    });

    it('should return my diaries with createdDate when succeed', async () => {
      // given
      const limit = 10;
      const page = 1;
      const createdDate = '2020-01-01';

      const getDiariesDto: GetDiariesDto = { limit, page, createdDate };

      const leftJoinAndSelect = jest.fn().mockReturnThis();
      const select = jest.fn().mockReturnThis();
      const where = jest.fn().mockReturnThis();
      const andWhere = jest.fn().mockReturnThis();
      const orderBy = jest.fn().mockReturnThis();
      const skip = jest.fn().mockReturnThis();
      const take = jest.fn().mockReturnThis();
      const getMany = jest.fn().mockResolvedValue(diaries);

      diaryRepository.createQueryBuilder = jest.fn().mockImplementation(() => ({
        leftJoinAndSelect,
        select,
        where,
        andWhere,
        orderBy,
        skip,
        take,
        getMany,
      }));

      // when
      const result = await diaryRepository.findMyDiaries(user, getDiariesDto);

      // then
      const startDate = new Date(createdDate);
      const endDate = new Date(createdDate);

      startDate.setHours(0, 0, 0);
      endDate.setHours(23, 59, 59);

      expect(leftJoinAndSelect).toBeCalledWith('diary.diaryMeta', 'diary_meta');
      expect(select).toBeCalledWith(['diary', 'diary_meta']);
      expect(where).toBeCalledWith('diary.user_id = :userId', {
        userId: user.id,
      });
      expect(orderBy).toBeCalledWith('diary.createdAt', 'DESC');
      expect(skip).toBeCalledWith((page - 1) * limit);
      expect(take).toBeCalledWith(limit);
      expect(andWhere).toBeCalledWith(
        'diary.createdAt BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
      expect(result).toEqual(diaries);
    });
  });

  describe('saveDiary', () => {
    it('should commit transaction when succeed', async () => {
      // given
      const diary = new Diary();
      const diaryMeta = new DiaryMeta();

      const connect = jest.fn();
      const startTransaction = jest.fn();
      const release = jest.fn();
      const commitTransaction = jest.fn();

      const getRepository = () => ({
        save: jest.fn(),
      });

      const manager = {
        connection: {
          createQueryRunner: () => ({
            connect,
            startTransaction,
            release,
            commitTransaction,
            manager: { getRepository },
          }),
        },
      };

      Object.defineProperty(diaryRepository, 'manager', { value: manager });

      // when
      await diaryRepository.saveDiary(diary, diaryMeta);

      // then
      expect(connect).toBeCalled();
      expect(commitTransaction).toBeCalled();
      expect(release).toBeCalled();
    });

    it('should rollback transaction when throw exception', async () => {
      // given
      const diary = new Diary();
      const diaryMeta = new DiaryMeta();

      const connect = jest.fn();
      const startTransaction = jest.fn();
      const release = jest.fn();
      const rollbackTransaction = jest.fn();

      const getRepository = () => ({
        save: jest
          .fn()
          .mockRejectedValue(new QueryFailedError('query', [], 'driveError')),
      });

      const manager = {
        connection: {
          createQueryRunner: () => ({
            connect,
            startTransaction,
            release,
            rollbackTransaction,
            manager: { getRepository },
          }),
        },
      };

      Object.defineProperty(diaryRepository, 'manager', { value: manager });

      // then
      await expect(
        diaryRepository.saveDiary(diary, diaryMeta),
      ).rejects.toThrowError(QueryFailedError);
      expect(rollbackTransaction).toBeCalled();
      expect(release).toBeCalled();
    });
  });
});
