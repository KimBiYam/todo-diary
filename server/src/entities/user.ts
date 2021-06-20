import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({
    example: 'userId@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  @Column({ type: 'varchar', unique: true, length: 100 })
  email: string;

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

  @Column({ name: 'is_certified', type: 'tinyint', default: false })
  isCertified: boolean;
}
