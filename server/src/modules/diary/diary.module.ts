import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user';
import { DiaryMetaRepository } from './diary-meta.repository';
import { DiaryController } from './diary.controller';
import { DiaryRepository } from './diary.repository';
import { DiaryService } from './diary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryRepository, DiaryMetaRepository]),
    UserModule,
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
