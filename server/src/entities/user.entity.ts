import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Diary } from './diary.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @ApiProperty({ example: 'username' })
  @IsString()
  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  username?: string;

  @ApiProperty({
    example: 'userId@gmail.com',
    description: '이메일',
  })
  @IsEmail()
  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email?: string;

  @ApiProperty({
    example: 'displayName',
    description: '유저이름',
    required: true,
  })
  @IsString()
  @Column({ name: 'display_name', type: 'varchar', length: 64 })
  displayName: string;

  @IsString()
  @Column({ name: 'photo_url', type: 'varchar', length: 500, nullable: true })
  photoUrl?: string;

  @Index()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'is_certified', default: false })
  isCertified: boolean;

  @OneToMany(() => Diary, (diary) => diary.user)
  diaries: Diary[];
}
