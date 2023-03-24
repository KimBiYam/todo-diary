import { Injectable } from '@nestjs/common';
import { DiaryMeta } from '@src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DiaryMetaRepository extends Repository<DiaryMeta> {
  constructor(private dataSource: DataSource) {
    super(DiaryMeta, dataSource.createEntityManager());
  }
}
