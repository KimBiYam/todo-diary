import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RequestUserForResolver } from '@src/decorators';
import { Diary } from '@src/entities';
import { ResolverJwtAuthGuard } from '../auth/resolver-jwt-auth.guard';
import { UserService } from '../user';
import { RequestUserDto } from '../user/dto';
import { DiaryService } from './diary.service';
import {
  CreateDiaryDto,
  DiariesExistsDatesDto,
  DiariesYearStatisticsRequestDto,
  GetDiariesDto,
  UpdateDiaryDto,
} from './dto';
import { DiariesYearStatisticsResponseDto } from './dto/diaries-year-statistics-response.dto';
import { DiaryDatesDto } from './dto/diary-dates.dto';

@Resolver(() => Diary)
@UseGuards(ResolverJwtAuthGuard)
export class DiaryResolver {
  constructor(
    private readonly diaryService: DiaryService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Diary])
  async findMyDiaries(
    @RequestUserForResolver() requestUserDto: RequestUserDto,
    @Args() getDiariesDto: GetDiariesDto,
  ): Promise<Diary[]> {
    const user = await this.userService.findUserById(requestUserDto.id);
    const diaries = await this.diaryService.findMyDiaries(user, getDiariesDto);
    return diaries;
  }

  @Query(() => DiariesYearStatisticsResponseDto)
  async getDiariesStatisticsByYear(
    @RequestUserForResolver() requestUserDto: RequestUserDto,
    @Args() { year }: DiariesYearStatisticsRequestDto,
  ): Promise<DiariesYearStatisticsResponseDto> {
    const user = await this.userService.findUserById(requestUserDto.id);

    return await this.diaryService.getDiariesStatisticsByYear(user, year);
  }

  @Query(() => DiaryDatesDto)
  async getDatesTheDiaryExists(
    @RequestUserForResolver() requestUserDto: RequestUserDto,
    @Args() diariesExistsDatesDto: DiariesExistsDatesDto,
  ): Promise<{ dates: number[] }> {
    const user = await this.userService.findUserById(requestUserDto.id);

    return await this.diaryService.getDatesTheDiaryExists(
      user,
      diariesExistsDatesDto,
    );
  }

  @Mutation(() => Diary)
  async createDiary(
    @RequestUserForResolver() requestUserDto: RequestUserDto,
    @Args('createDiaryDto') createDiaryDto: CreateDiaryDto,
  ): Promise<Diary> {
    const user = await this.userService.findUserById(requestUserDto.id);
    return await this.diaryService.createDiary(user, createDiaryDto);
  }

  @Query(() => Diary)
  async findMyDiary(
    @RequestUserForResolver() requestUserDto: RequestUserDto,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Diary> {
    const user = await this.userService.findUserById(requestUserDto.id);
    return await this.diaryService.findMyDiary(user, id);
  }

  @Mutation(() => Diary)
  async updateMyDiary(
    @RequestUserForResolver() requestUserDto: RequestUserDto,
    @Args('updateDiaryDto') updateDiaryDto: UpdateDiaryDto,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Diary> {
    const user = await this.userService.findUserById(requestUserDto.id);
    return await this.diaryService.updateMyDiary(user, updateDiaryDto, id);
  }

  @Mutation(() => Boolean)
  async deleteMyDiary(
    @RequestUserForResolver() requestUserDto: RequestUserDto,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    const user = await this.userService.findUserById(requestUserDto.id);
    await this.diaryService.deleteMyDiary(user, id);
    return true;
  }
}
