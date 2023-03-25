import { Diary, DiaryMeta, User } from '@src/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import { Between, DeleteResult } from 'typeorm';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { CreateDiaryDto, DiariesExistsDatesDto, GetDiariesDto } from './dto';
import { CommonUtil } from '@src/util/common.util';
import { DateUtil } from '@src/util/date.util';
import { DiariesYearStatisticsResponseDto } from './dto/diaries-year-statistics-response.dto';
import { DiariesStatisticsDto } from './dto/diaries-statistics.dto';
import { DiaryDatesDto } from './dto/diary-dates.dto';

@Injectable()
export class DiaryService {
  constructor(private readonly diaryRepository: DiaryRepository) {}
  async findMyDiaries(
    user: User,
    getDiariesDto: GetDiariesDto,
  ): Promise<Diary[]> {
    return await this.diaryRepository.findMyDiaries(user, getDiariesDto);
  }

  async findMyDiary(user: User, id: number): Promise<Diary> {
    const diary = await this.diaryRepository.findMyDiary(user, id);

    if (!CommonUtil.isDataExists(diary)) {
      throw new NotFoundException('This diary is not exist');
    }

    return diary;
  }

  async findDiariesByYear(user: User, year: number) {
    const firstDate = DateUtil.getFirstDateOfYear(year);
    const lastDate = DateUtil.getLastDateOfYear(year);

    const diaries = await this.diaryRepository.find({
      where: { createdAt: Between(firstDate, lastDate), user: { id: user.id } },
    });

    return diaries;
  }

  async findDiariesByMonth(user: User, year: number, month: number) {
    const firstDate = DateUtil.getFirstDateOfMonth(year, month);
    const lastDate = DateUtil.getLastDateOfMonth(year, month);

    const diaries = await this.diaryRepository.find({
      relations: { user: true },
      where: { createdAt: Between(firstDate, lastDate), user: { id: user.id } },
    });

    return diaries;
  }

  async createDiary(user: User, createDiaryDto: CreateDiaryDto) {
    const { content, title } = createDiaryDto;

    const diaryMeta = new DiaryMeta();
    diaryMeta.content = content;

    const diary = new Diary();
    diary.title = title;
    diary.diaryMeta = diaryMeta;
    diary.user = user;

    return this.diaryRepository.saveDiary(diary, diaryMeta);
  }

  async updateMyDiary(user: User, updateDiaryDto: UpdateDiaryDto, id: number) {
    const { content, isFinished, title } = updateDiaryDto;

    const diary = await this.findMyDiary(user, id);

    const updateDiary = new Diary();
    updateDiary.title = title;
    updateDiary.isFinished = isFinished;
    updateDiary.id = diary.id;

    const updateDiaryMeta = new DiaryMeta();
    updateDiaryMeta.content = content;
    updateDiaryMeta.id = diary.diaryMeta.id;

    return await this.diaryRepository.saveDiary(updateDiary, updateDiaryMeta);
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

    const diariesYearStatisticsResponseDto: DiariesYearStatisticsResponseDto = {
      diariesStatisticsByYear,
    };

    return diariesYearStatisticsResponseDto;
  }

  async getDatesTheDiaryExists(
    user: User,
    diariesExistsDatesDto: DiariesExistsDatesDto,
  ): Promise<DiaryDatesDto> {
    const { year, month } = diariesExistsDatesDto;

    const diaries = await this.findDiariesByMonth(user, year, month);

    const dates = new Set(diaries.map((diary) => diary.createdAt.getDate()));

    return new DiaryDatesDto([...dates]);
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
    const finishedDiariesCount = diaries.filter(
      (diary) => diary.isFinished,
    ).length;

    const diariesStatisticsDto: DiariesStatisticsDto = {
      totalCount: diaries.length,
      finishedDiariesCount,
    };

    return diariesStatisticsDto;
  }
}
