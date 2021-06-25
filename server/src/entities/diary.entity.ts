import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiaryMeta } from './diary-meta.entity';
import { User } from './user.entity';

@Entity({ name: 'diary' })
export class Diary {
  @PrimaryGeneratedColumn({ type: 'bigint' })
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

  @ManyToOne(() => User, (user) => user.diaries, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
