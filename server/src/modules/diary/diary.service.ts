import { Diary, DiaryMeta } from '@src/entities';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import {
  Between,
  DeleteResult,
  EntityManager,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { UpdateDiaryDto } from './dto/update-diary-dto';
import { CreateDiaryDto } from './dto';
import { UserService } from '../user';
import { RequestUserDto } from '../user/dto';
import { CommonUtil } from '@src/util/common.util';
import { DateUtil } from '@src/util/date.util';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryRepository: DiaryRepository,
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger('DiaryService');

  async findMyDiaries(
    requestUserDto: RequestUserDto,
    page: number,
    limit: number,
  ): Promise<Diary[]> {
    const { email } = requestUserDto;

    const user = await this.userService.findUserByEmail(email);

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
    const { email } = requestUserDto;

    const user = await this.userService.findUserByEmail(email);

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
    const { email } = requestUserDto;

    const user = await this.userService.findUserByEmail(email);

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

    const firstDayOfYear = DateUtil.getFirstDayOfYear(year);
    const lastDayOfYear = DateUtil.getLastDayOfYear(year);

    const diaries = await this.diaryRepository.find({
      where: { createdAt: Between(firstDayOfYear, lastDayOfYear), user: user },
    });

    return diaries;
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  async createDiary(
    requestUserDto: RequestUserDto,
    createDiaryDto: CreateDiaryDto,
    @TransactionManager() manager?: EntityManager,
  ): Promise<any> {
    const { email } = requestUserDto;
    const { content, title } = createDiaryDto;

    const user = await this.userService.findUserByEmail(email);

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

    const diaryMeta = new DiaryMeta();
    diaryMeta.content = content;

    const diary = new Diary();
    diary.title = title;
    diary.diaryMeta = diaryMeta;
    diary.user = user;

    await manager.save(diaryMeta);
    return await manager.save(diary);
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  async updateMyDiary(
    requestUserDto: RequestUserDto,
    updateDiaryDto: UpdateDiaryDto,
    id: number,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Diary> {
    const { content, isFinished, title } = updateDiaryDto;

    const diary = await this.findMyDiary(requestUserDto, id);

    const updateDiary = new Diary();
    updateDiary.title = title;
    updateDiary.isFinished = isFinished;
    updateDiary.id = diary.id;

    const updateDiartyMeta = new DiaryMeta();
    updateDiartyMeta.content = content;
    updateDiartyMeta.id = diary.diaryMeta.id;

    await manager.save(updateDiartyMeta);
    return await manager.save(updateDiary);
  }

  async deleteMyDiary(
    requestUserDto: RequestUserDto,
    id: number,
  ): Promise<DeleteResult> {
    const diary = await this.findMyDiary(requestUserDto, id);

    return await this.diaryRepository.delete(diary.id);
  }

  async getDiariesAchievementRate(requestUserDto: RequestUserDto) {
    const { email } = requestUserDto;

    const user = await this.userService.findUserByEmail(email);

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

    const diaries = await this.diaryRepository.find({ where: { user } });

    const { finishedDiariesCount, totalCount } = this.getDiariesStatistics(
      diaries,
    );

    return `${((finishedDiariesCount / totalCount) * 100).toFixed(1)}%`;
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
