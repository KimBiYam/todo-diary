import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({ name: 'is_finished', type: 'tinyint', default: false })
  isFinished: boolean;
}
