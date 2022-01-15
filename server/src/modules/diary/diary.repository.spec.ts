import { Test, TestingModule } from '@nestjs/testing';
import { diaries } from '@src/__fixtures__/diary/diaries';
import { diary } from '@src/__fixtures__/diary/diary';
import { user } from '@src/__fixtures__/user/user';
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
});
