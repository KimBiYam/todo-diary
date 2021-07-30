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
  diaryMeta: DiaryMeta;

  @ManyToOne(() => User, (user) => user.diaries, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  serialize() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      isFinished: this.isFinished,
      title: this.title,
      content: this.diaryMeta.content,
    };
  }
}
