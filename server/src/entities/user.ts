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
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiProperty({ example: 'username', description: '유저 ID', required: false })
  @IsString()
  @Index()
  @Column({ type: 'varchar', nullable: true })
  username: string;

  @ApiProperty({
    example: 'displayName',
    description: '유저이름',
    required: true,
  })
  @IsString()
  @Column({ name: 'display_name', type: 'varchar' })
  displayName: string;

  @Index()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'is_certified', type: 'tinyint', default: false })
  isCertified: boolean;
}
