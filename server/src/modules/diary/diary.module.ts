import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary, DiaryMeta } from '@src/entities';
import { UserModule } from '../user';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diary, DiaryMeta]), UserModule],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
