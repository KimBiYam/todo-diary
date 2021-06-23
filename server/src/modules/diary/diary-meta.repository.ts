import { DiaryMeta } from '@src/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(DiaryMeta)
export class DiaryMetaRepository extends Repository<DiaryMeta> {}
