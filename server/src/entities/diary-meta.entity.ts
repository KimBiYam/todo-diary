import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Diary } from './diary.entity';

@Entity({ name: 'diary_meta' })
export class DiaryMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 5000 })
  content: string;

  @OneToOne(() => Diary, (diary) => diary.diaryMeta)
  diary: Diary;
}
