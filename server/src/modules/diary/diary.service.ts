import { Diary, DiaryMeta, User } from '@src/entities';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import { Between, Connection, DeleteResult } from 'typeorm';
import { UpdateDiaryDto } from './dto/update-diary-dto';
import { CreateDiaryDto, DiariesExistsDatesDto } from './dto';
import { UserService } from '../user';
import { RequestUserDto } from '../user/dto';
import { CommonUtil } from '@src/util/common.util';
import { DateUtil } from '@src/util/date.util';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryRepository: DiaryRepository,
    private readonly userService: UserService,
    private readonly connection: Connection,
  ) {}
  private readonly logger = new Logger('DiaryService');

  async findMyDiaries(requestUserDto: RequestUserDto): Promise<Diary[]> {
    const { id } = requestUserDto;

    const user = await this.userService.findUserById(id);

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

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
    requestUserDto: RequestUserDto,
    page: number,
    limit: number,
  ): Promise<Diary[]> {
    const { id } = requestUserDto;

    const user = await this.userService.findUserById(id);

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

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

  async findMyDiary(
    requestUserDto: RequestUserDto,
    id: number,
  ): Promise<Diary> {
    const { id: userId } = requestUserDto;

    const user = await this.userService.findUserById(userId);

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

    const diary = await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.user', 'user')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta', 'user'])
      .where('diary.id = :id', { id })
      .getOne();

    if (!CommonUtil.isDataExists(diary)) {
      throw new NotFoundException('This diary is not exist');
    }

    if (diary.user.id !== user.id) {
      throw new BadRequestException('This diary is not your diary post');
    }

    return diary;
  }

  async findDiariesByYear(requestUserDto: RequestUserDto, year: number) {
    const { id } = requestUserDto;

    const user = await this.userService.findUserById(id);

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

    const firstDate = DateUtil.getFirstDateOfYear(year);
    const lastDate = DateUtil.getLastDateOfYear(year);

    const diaries = await this.diaryRepository.find({
      where: { createdAt: Between(firstDate, lastDate), user: user },
    });

    return diaries;
  }

  async findDiariesByMonth(
    requestUserDto: RequestUserDto,
    year: number,
    month: number,
  ) {
    const { id } = requestUserDto;

    const user = await this.userService.findUserById(id);

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

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
    requestUserDto: RequestUserDto,
    updateDiaryDto: UpdateDiaryDto,
    id: number,
  ): Promise<Diary> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    const { content, isFinished, title } = updateDiaryDto;

    const diary = await this.findMyDiary(requestUserDto, id);

    try {
      await queryRunner.startTransaction();

      const updateDiary = new Diary();
      updateDiary.title = title;
      updateDiary.isFinished = isFinished;
      updateDiary.id = diary.id;

      const updateDiartyMeta = new DiaryMeta();
      updateDiartyMeta.content = content;
      updateDiartyMeta.id = diary.diaryMeta.id;

      await queryRunner.manager.getRepository(DiaryMeta).save(updateDiartyMeta);

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

  async deleteMyDiary(
    requestUserDto: RequestUserDto,
    id: number,
  ): Promise<DeleteResult> {
    const diary = await this.findMyDiary(requestUserDto, id);

    return await this.diaryRepository.delete(diary.id);
  }

  async getDiariesStatisticsByYear(
    requestUserDto: RequestUserDto,
    year: number,
  ) {
    const diariesByYear = await this.findDiariesByYear(requestUserDto, year);
    const groupedDairesByMonth = this.groupDiariesByMonth(diariesByYear);

    const diariesStatisticsByYear = Object.keys(groupedDairesByMonth).map(
      (month) => {
        const diariesStatistics = this.getDiariesStatistics(
          groupedDairesByMonth[month],
        );

        return { month: parseInt(month), ...diariesStatistics };
      },
    );

    return diariesStatisticsByYear;
  }

  async getTheDatesTheDiaryExists(
    requestUserDto: RequestUserDto,
    diariesExistsDatesDto: DiariesExistsDatesDto,
  ) {
    const { year, month } = diariesExistsDatesDto;

    const diaries = await this.findDiariesByMonth(requestUserDto, year, month);
  }

  groupDiariesByMonth = (diaries: Diary[]) => {
    const months = DateUtil.getAllMonths();
    const groupedDairesByMonth: { [key: string]: Diary[] } = {};

    months.forEach((month) => {
      diaries.forEach((diary) => {
        if (groupedDairesByMonth[month] === undefined) {
          groupedDairesByMonth[month] = [];
        }

        if (diary.createdAt.getMonth() + 1 === month) {
          groupedDairesByMonth[month].push(diary);
        }
      });
    });

    return groupedDairesByMonth;
  };

  getDiariesStatistics(diaries: Diary[]) {
    const finishedDiariesCount = diaries.filter((diary) => diary.isFinished)
      .length;

    return { totalCount: diaries.length, finishedDiariesCount };
  }
}
