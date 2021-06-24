import { Diary, DiaryMeta } from '@src/entities';
import { Injectable, Logger } from '@nestjs/common';
import { RegisterDiaryDto } from './dto/register-diary.dto';
import { DiaryRepository } from './diary.repository';
import { DiaryMetaRepository } from './diary-meta.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryRepository: DiaryRepository,
    private readonly diaryMetaRepository: DiaryMetaRepository,
  ) {}
  private readonly logger = new Logger('DiaryService');

  async getDiaries(): Promise<Diary[]> {
    return await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta.content'])
      .getMany()
      .then((diaries) => this.cascadingDiaries(diaries));
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  async registerDiary(
    registerDiaryDto: RegisterDiaryDto,
    @TransactionManager() manager?: EntityManager,
  ): Promise<any> {
    const { content, title } = registerDiaryDto;

    const diaryMeta = new DiaryMeta();
    diaryMeta.content = content;

    const diary = new Diary();
    diary.title = title;
    diary.diaryMeta = diaryMeta;

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
