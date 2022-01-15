import { Test, TestingModule } from '@nestjs/testing';
import { diary } from '@src/__fixtures__/diary/diary';
import { user } from '@src/__fixtures__/user/user';
import { DiaryRepository } from './diary.repository';

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
    it('should return diary when succeed find my diary', async () => {
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
});
