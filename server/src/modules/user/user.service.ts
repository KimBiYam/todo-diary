import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/entities';
import { DeleteResult, Repository } from 'typeorm';
import { RegsiterUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  private readonly logger = new Logger('User');

  async create(regsiterUserDto: RegsiterUserDto): Promise<User> {
    const { email } = regsiterUserDto;
    const user = await this.findOneByEmail(email);
    if (user) {
      this.logger.error('Is exist user id');
      throw new BadRequestException('Is exist email');
    }

    return await this.userRepository.save(regsiterUserDto);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
