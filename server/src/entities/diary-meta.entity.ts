import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Diary } from './diary.entity';

@Entity({ name: 'diary_meta' })
export class DiaryMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ type: 'varchar', length: 5000 })
  content: string;

  @OneToOne(() => Diary, (diary) => diary.diaryMeta, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'diary_id' })
  diary: Diary;
}
