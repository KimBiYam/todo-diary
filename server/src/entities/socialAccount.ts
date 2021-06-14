import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'social_account' })
export class SocialAccount {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'social_id', type: 'varchar', length: 255 })
  @Index()
  socialId: string;

  @Column({ type: 'varchar', length: 20 })
  @Index()
  provider: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
