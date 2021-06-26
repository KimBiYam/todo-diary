import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '@src/entities';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  private readonly logger = new Logger('User');

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      this.logger.error('This user is not exist');
      throw new NotFoundException('This user is not exist');
    }

    return user;
  }
}
