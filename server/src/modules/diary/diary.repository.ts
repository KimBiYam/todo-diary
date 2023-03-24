import { Injectable } from '@nestjs/common';
import { Diary, DiaryMeta, User } from '@src/entities';
import { DataSource, Repository } from 'typeorm';
import { GetDiariesDto } from './dto';

@Injectable()
export class DiaryRepository extends Repository<Diary> {
  constructor(private dataSource: DataSource) {
    super(Diary, dataSource.createEntityManager());
  }

  async findMyDiary(user: User, id: number) {
    return await this.createQueryBuilder('diary')
      .leftJoinAndSelect('diary.user', 'user')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta', 'user'])
      .where('diary.user', { user })
      .where('diary.id = :id', { id })
      .getOne();
  }

  async findMyDiaries(user: User, getDiariesDto: GetDiariesDto) {
    const { limit, page, createdDate } = getDiariesDto;

    const queryBuilder = this.createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta'])
      .where('diary.user_id = :userId', { userId: user.id })
      .orderBy('diary.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (createdDate) {
      const startDate = new Date(createdDate);
      const endDate = new Date(createdDate);

      startDate.setHours(0, 0, 0);
      endDate.setHours(23, 59, 59);

      queryBuilder.andWhere('diary.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    return await queryBuilder.getMany();
  }

  async saveDiary(diary: Diary, diaryMeta: DiaryMeta) {
    const queryRunner = this.manager.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.getRepository(DiaryMeta).save(diaryMeta);

      const result = await queryRunner.manager.getRepository(Diary).save(diary);

      await queryRunner.commitTransaction();

      return result;
    } catch (e) {
      queryRunner.rollbackTransaction();
      throw e;
    } finally {
      queryRunner.release();
    }
  }
}
