import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Diary } from './diary';

@Entity({ name: 'diary_meta' })
export class DiaryMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 5000 })
  content: string;

  @OneToOne(() => Diary)
  @JoinColumn({ name: 'diary_id' })
  diray: Diary;
}
