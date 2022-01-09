import { Diary, User } from '@src/entities';
import { EntityRepository, Repository } from 'typeorm';
import { GetDiariesDto } from './dto';
import { FindDiariesByDateDto } from './dto/find-diaries-by-date.dto';

@EntityRepository(Diary)
export class DiaryRepository extends Repository<Diary> {
  async findMyDiaries(user: User, getDiariesDto: GetDiariesDto) {
    const { page, limit } = getDiariesDto;

    return await this.createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta'])
      .where('diary.user_id = :userId', { userId: user.id })
      .orderBy('diary.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async findDiariesByDate(
    user: User,
    findDiariesByDateDto: FindDiariesByDateDto,
  ) {
    const { limit, page, startDate, endDate } = findDiariesByDateDto;

    return await this.createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta'])
      .where('diary.user_id = :userId', { userId: user.id })
      .andWhere('diary.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .orderBy('diary.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }
}
