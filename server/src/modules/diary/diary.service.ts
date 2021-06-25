import { Diary, DiaryMeta } from '@src/entities';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RegisterDiaryDto } from './dto/register-diary.dto';
import { DiaryRepository } from './diary.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { RequestUserDto } from '../user/dto/request-user.dto';
import { UserService } from '../user';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryRepository: DiaryRepository,
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger('DiaryService');

  async getDiaries(requestUserDto: RequestUserDto): Promise<Diary[]> {
    const { email } = requestUserDto;

    const user = await this.userService.findOneByEmail(email);

    return await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta.content'])
      .where('diary.user_id = :userId', { userId: user.id })
      .getMany()
      .then((diaries) => this.cascadingDiaries(diaries));
  }

  async getDiary(requestUserDto: RequestUserDto, id: number): Promise<Diary> {
    const { email } = requestUserDto;

    const user = await this.userService.findOneByEmail(email);

    const diary = await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .leftJoinAndSelect('diary.user', 'user')
      .select(['diary', 'diary_meta.content', 'user.id'])
      .where('diary.id = :id', { id })
      .getOne();

    if (diary.user.id !== user.id) {
      this.logger.error('This diary is not your diary post');
      throw new BadRequestException('This diary is not your diary post');
    }

    return diary;
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  async registerDiary(
    requestUserDto: RequestUserDto,
    registerDiaryDto: RegisterDiaryDto,
    @TransactionManager() manager?: EntityManager,
  ): Promise<any> {
    const { email } = requestUserDto;

    const user = await this.userService.findOneByEmail(email);

    const { content, title } = registerDiaryDto;

    const diaryMeta = new DiaryMeta();
    diaryMeta.content = content;

    const diary = new Diary();
    diary.title = title;
    diary.diaryMeta = diaryMeta;
    diary.user = user;

    await manager.save(diaryMeta);
    return await manager.save(diary);
  }

  cascadingDiaries(diaries: Diary[]): Diary[] {
    return diaries.map((diary) => {
      const { content } = diary.diaryMeta;
      delete diary.diaryMeta;
      return { ...diary, content };
    });
  }
}
