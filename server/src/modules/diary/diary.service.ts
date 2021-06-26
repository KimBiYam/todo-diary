import { Diary, DiaryMeta } from '@src/entities';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RegisterDiaryDto } from './dto/register-diary.dto';
import { DiaryRepository } from './diary.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { RequestUserDto } from '../user/dto/request-user.dto';
import { UserService } from '../user';
import { UpdateDiaryDto } from './dto/update-diary-dto';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryRepository: DiaryRepository,
    private readonly userService: UserService,
  ) {}
  private readonly logger = new Logger('DiaryService');

  async getOwnDiaries(requestUserDto: RequestUserDto): Promise<Diary[]> {
    const { email } = requestUserDto;

    const user = await this.userService.findOneByEmail(email);

    return await this.diaryRepository.find({
      join: {
        alias: 'diary',
        leftJoinAndSelect: { diaryMeta: 'diary.diaryMeta' },
      },
      where: { user },
    });
  }

  async getOwnDiary(
    requestUserDto: RequestUserDto,
    id: number,
  ): Promise<Diary> {
    const { email } = requestUserDto;

    const user = await this.userService.findOneByEmail(email);

    const diary = await this.diaryRepository.findOne(id, {
      join: {
        alias: 'diary',
        leftJoinAndSelect: { diaryMeta: 'diary.diaryMeta' },
      },
    });

    if (diary.user.id !== user.id) {
      this.logger.error('This diary is not your diary post');
      throw new BadRequestException('This diary is not your diary post');
    }

    return diary;
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  async updateDiary(
    requestUserDto: RequestUserDto,
    updateDiaryDto: UpdateDiaryDto,
    id: number,
    @TransactionManager() manager?: EntityManager,
  ): Promise<Diary> {
    const { content, isFinished, title } = updateDiaryDto;

    const diary = await this.getOwnDiary(requestUserDto, id);

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

  @Transaction({ isolation: 'SERIALIZABLE' })
  async registerDiary(
    requestUserDto: RequestUserDto,
    registerDiaryDto: RegisterDiaryDto,
    @TransactionManager() manager?: EntityManager,
  ): Promise<any> {
    const { email } = requestUserDto;
    const { content, title } = registerDiaryDto;

    const user = await this.userService.findOneByEmail(email);

    const diaryMeta = new DiaryMeta();
    diaryMeta.content = content;

    const diary = new Diary();
    diary.title = title;
    diary.diaryMeta = diaryMeta;
    diary.user = user;

    await manager.save(diaryMeta);
    return await manager.save(diary);
  }
}
