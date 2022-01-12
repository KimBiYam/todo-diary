import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@src/entities';
import { CommonUtil } from '@src/util/common.util';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!CommonUtil.isDataExists(user)) {
      throw new NotFoundException('This user is not exists!');
    }

    return user;
  }

  async updateUser(user: User) {
    const result = await this.userRepository.save(user);

    return result;
  }
}
