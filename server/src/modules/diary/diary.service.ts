import { Diary, DiaryMeta } from '@src/entities';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import {
  DeleteResult,
  EntityManager,
  Transaction,
  TransactionManager,
} from 'typeorm';
import { UpdateDiaryDto } from './dto/update-diary-dto';
import { CreateDiaryDto } from './dto';
import { UserService } from '../user';
import { RequestUserDto } from '../user/dto';
import { ResponseDiaryDto } from './dto/response-diary.dto';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryRepository: DiaryRepository,
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger('DiaryService');

  async findDiaries(
    requestUserDto: RequestUserDto,
  ): Promise<ResponseDiaryDto[]> {
    const { email } = requestUserDto;

    const user = await this.userService.findUserByEmail(email);

    const diaries = await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta'])
      .where('diary.user_id = :userId', { userId: user.id })
      .getMany();

    return diaries.map((diary) => this.convertDiary(diary));
  }

  async findDiary(requestUserDto: RequestUserDto, id: number): Promise<Diary> {
    const { email } = requestUserDto;

    const user = await this.userService.findUserByEmail(email);

    const diary = await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.user', 'user')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta', 'user'])
      .where('diary.id = :id', { id })
      .getOne();

    if (!diary) {
      throw new NotFoundException('This diary is not exist');
    }

    if (diary.user.id !== user.id) {
      this.logger.error('This diary is not your diary post');
      throw new BadRequestException('This diary is not your diary post');
    }

    return diary;
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

    const diaryMeta = new DiaryMeta();
    diaryMeta.content = content;

    const diary = new Diary();
    diary.title = title;
    diary.diaryMeta = diaryMeta;
    diary.user = user;

    await manager.save(diaryMeta);
    return await manager.save(diary);
  }

  async findConvertedDiary(requestUserDto: RequestUserDto, id: number) {
    const diary = await this.findDiary(requestUserDto, id);
    return this.convertDiary(diary);
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  async updateDiary(
    requestUserDto: RequestUserDto,
    updateDiaryDto: UpdateDiaryDto,
    id: number,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Diary> {
    const { content, isFinished, title } = updateDiaryDto;

    const diary = await this.findDiary(requestUserDto, id);

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

  async deleteDiary(
    requestUserDto: RequestUserDto,
    id: number,
  ): Promise<DeleteResult> {
    const diary = await this.findDiary(requestUserDto, id);

    return await this.diaryRepository.delete(diary.id);
  }

  convertDiary(diary: Diary): ResponseDiaryDto {
    const { id, createdAt, isFinished, title, diaryMeta } = diary;
    const { content } = diaryMeta;

    return {
      id,
      createdAt,
      isFinished,
      title,
      content,
    };
  }
}
