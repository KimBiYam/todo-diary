import { Injectable } from '@nestjs/common';
import { User } from '@src/entities';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async updateUser(user: User) {
    const result = await this.userRepository.save(user);
    return result;
  }
}
