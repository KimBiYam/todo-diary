import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Diary } from './diary.entity';

@Entity({ name: 'diary_meta' })
@ObjectType()
export class DiaryMeta {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 5000 })
  @Field()
  content: string;

  @OneToOne(() => Diary, (diary) => diary.diaryMeta, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'diary_id' })
  @Field(() => Diary)
  diary: Diary;
}
