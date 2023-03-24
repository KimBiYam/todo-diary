import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary, DiaryMeta } from '@src/entities';
import { UserModule } from '../user';
import { DiaryMetaRepository } from './diary-meta.repository';
import { DiaryController } from './diary.controller';
import { DiaryRepository } from './diary.repository';
import { DiaryService } from './diary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diary, DiaryMeta]), UserModule],
  controllers: [DiaryController],
  providers: [DiaryService, DiaryRepository, DiaryMetaRepository],
})
export class DiaryModule {}
