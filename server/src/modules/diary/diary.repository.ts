import { Diary } from '@src/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Diary)
export class DiaryRepository extends Repository<Diary> {}
