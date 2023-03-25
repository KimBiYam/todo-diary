import { Field, ID, ObjectType } from '@nestjs/graphql';
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
@ObjectType()
export class Diary {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  @Field()
  title: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  @Index()
  @Field()
  createdAt: Date;

  @Column({ name: 'is_finished', default: false })
  @Field()
  isFinished: boolean;

  @OneToOne(() => DiaryMeta, (diaryMeta) => diaryMeta.diary)
  @Field(() => DiaryMeta)
  diaryMeta: DiaryMeta;

  @ManyToOne(() => User, (user) => user.diaries, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
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
