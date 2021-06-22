import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary, DiaryMeta } from '@src/entities';
import { Injectable, Logger } from '@nestjs/common';
import { RegisterDiaryDto } from './dto/register-diary.dto';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
    @InjectRepository(DiaryMeta)
    private readonly diaryMetaRepository: Repository<DiaryMeta>,
  ) {}
  private readonly logger = new Logger('DiaryService');

  async getDiaries(): Promise<any> {
    return await this.diaryRepository
      .createQueryBuilder('diary')
      .leftJoinAndSelect('diary.diaryMeta', 'diary_meta')
      .select(['diary', 'diary_meta.content'])
      .getMany();
  }

  async registerDiary(registerDiaryDto: RegisterDiaryDto): Promise<any> {
    const { content, title } = registerDiaryDto;

    const diaryMeta = new DiaryMeta();
    diaryMeta.content = content;

    const diary = new Diary();
    diary.title = title;
    diary.diaryMeta = diaryMeta;

    await this.diaryMetaRepository.save(diaryMeta);
    return await this.diaryRepository.save(diary);
  }
}
