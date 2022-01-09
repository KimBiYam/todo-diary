import { Diary, DiaryMeta, User } from '@src/entities';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import { Between, Connection, DeleteResult } from 'typeorm';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { CreateDiaryDto, DiariesExistsDatesDto, GetDiariesDto } from './dto';
import { RequestUserDto } from '../user/dto';
import { CommonUtil } from '@src/util/common.util';
import { DateUtil } from '@src/util/date.util';
import { DiariesStatisticsResponseDto } from './dto/diaries-statistics-response.dto';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryRepository: DiaryRepository,
    private readonly connection: Connection,
  ) {}
  private readonly logger = new Logger('DiaryService');

  async findMyDiaries(user: User): Promise<Diary[]> {
    const diaries = await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta'])
      .where('diary.user_id = :userId', { userId: user.id })
      .orderBy('diary.createdAt', 'DESC')
      .getMany();

    return diaries;
  }

  async findMyDiariesByPage(
    user: User,
    page: number,
    limit: number,
  ): Promise<Diary[]> {
    const diaries = await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta'])
      .where('diary.user_id = :userId', { userId: user.id })
      .orderBy('diary.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return diaries;
  }

  async findDiariesByDateWithPage(user: User, getDiariesDto: GetDiariesDto) {
    const { limit, page, createdDate } = getDiariesDto;

    const firstDate = new Date(createdDate);
    const lastDate = new Date(createdDate);

    firstDate.setHours(0, 0, 0);
    lastDate.setHours(23, 59, 59);

    const diaries = await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta'])
      .where('diary.user_id = :userId', { userId: user.id })
      .andWhere('diary.createdAt BETWEEN :firstDate AND :lastDate', {
        firstDate,
        lastDate,
      })
      .orderBy('diary.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return diaries;
  }

  async findMyDiary(user: User, id: number): Promise<Diary> {
    const diary = await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.user', 'user')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta', 'user'])
      .where('diary.user', { user })
      .where('diary.id = :id', { id })
      .getOne();

    if (!CommonUtil.isDataExists(diary)) {
      throw new NotFoundException('This diary is not exist');
    }

    return diary;
  }

  async findDiariesByYear(user: User, year: number) {
    const firstDate = DateUtil.getFirstDateOfYear(year);
    const lastDate = DateUtil.getLastDateOfYear(year);

    const diaries = await this.diaryRepository.find({
      where: { createdAt: Between(firstDate, lastDate), user: user },
    });

    return diaries;
  }

  async findDiariesByMonth(user: User, year: number, month: number) {
    const firstDate = DateUtil.getFirstDateOfMonth(year, month);
    const lastDate = DateUtil.getLastDateOfMonth(year, month);

    const diaries = await this.diaryRepository.find({
      where: { createdAt: Between(firstDate, lastDate), user: user },
    });

    return diaries;
  }

  async createDiary(
    requestUserDto: RequestUserDto,
    createDiaryDto: CreateDiaryDto,
  ): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const { id } = requestUserDto;
    const { content, title } = createDiaryDto;

    const user = await queryRunner.manager
      .getRepository(User)
      .findOne({ where: { id } });

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

    try {
      await queryRunner.startTransaction();

      const diaryMeta = new DiaryMeta();
      diaryMeta.content = content;

      const diary = new Diary();
      diary.title = title;
      diary.diaryMeta = diaryMeta;
      diary.user = user;

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

  async updateMyDiary(
    user: User,
    updateDiaryDto: UpdateDiaryDto,
    id: number,
  ): Promise<Diary> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const { content, isFinished, title } = updateDiaryDto;

    const diary = await this.findMyDiary(user, id);

    try {
      await queryRunner.startTransaction();

      const updateDiary = new Diary();
      updateDiary.title = title;
      updateDiary.isFinished = isFinished;
      updateDiary.id = diary.id;

      const updateDiaryMeta = new DiaryMeta();
      updateDiaryMeta.content = content;
      updateDiaryMeta.id = diary.diaryMeta.id;

      await queryRunner.manager.getRepository(DiaryMeta).save(updateDiaryMeta);

      const result = await queryRunner.manager
        .getRepository(Diary)
        .save(updateDiary);

      await queryRunner.commitTransaction();

      return result;
    } catch (e) {
      queryRunner.rollbackTransaction();
      throw e;
    } finally {
      queryRunner.release();
    }
  }

  async deleteMyDiary(user: User, id: number): Promise<DeleteResult> {
    const diary = await this.findMyDiary(user, id);

    return await this.diaryRepository.delete(diary.id);
  }

  async getDiariesStatisticsByYear(user: User, year: number) {
    const diariesByYear = await this.findDiariesByYear(user, year);
    const groupedDiariesByMonth = this.groupDiariesByMonth(diariesByYear);

    const diariesStatisticsByYear = Object.keys(groupedDiariesByMonth).map(
      (month) => {
        const diariesStatistics = this.getDiariesStatistics(
          groupedDiariesByMonth[month],
        );

        return { month: parseInt(month), ...diariesStatistics };
      },
    );

    const diariesStatisticsResponseDto: DiariesStatisticsResponseDto = {
      diariesStatisticsByYear,
    };

    return diariesStatisticsResponseDto;
  }

  async getDatesTheDiaryExists(
    user: User,
    diariesExistsDatesDto: DiariesExistsDatesDto,
  ) {
    const { year, month } = diariesExistsDatesDto;

    const diaries = await this.findDiariesByMonth(user, year, month);

    const dates = new Set(diaries.map((diary) => diary.createdAt.getDate()));

    return [...dates];
  }

  groupDiariesByMonth = (diaries: Diary[]) => {
    const months = DateUtil.getAllMonths();
    const groupedDiariesByMonth: { [key: string]: Diary[] } = {};

    months.forEach((month) => {
      diaries.forEach((diary) => {
        if (groupedDiariesByMonth[month] === undefined) {
          groupedDiariesByMonth[month] = [];
        }

        if (diary.createdAt.getMonth() + 1 === month) {
          groupedDiariesByMonth[month].push(diary);
        }
      });
    });

    return groupedDiariesByMonth;
  };

  getDiariesStatistics(diaries: Diary[]) {
    const finishedDiariesCount = diaries.filter((diary) => diary.isFinished)
      .length;

    return { totalCount: diaries.length, finishedDiariesCount };
  }
}
