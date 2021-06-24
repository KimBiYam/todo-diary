import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiaryMeta } from './diary-meta.entity';

@Entity({ name: 'diary' })
export class Diary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  title: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @Index()
  createdAt: Date;

  @Column({ name: 'is_finished', default: false })
  isFinished: boolean;

  @OneToOne(() => DiaryMeta, (diaryMeta) => diaryMeta.diary)
  @JoinColumn({ name: 'diary_meta_id' })
  diaryMeta: DiaryMeta;
}
