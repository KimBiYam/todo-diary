import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { RequestUserForResolver } from '@src/decorators';
import { User } from '@src/entities';
import { ResolverJwtAuthGuard } from '../auth/resolver-jwt-auth.guard';
import { RequestUserDto } from './dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(ResolverJwtAuthGuard)
  async findUserProfile(
    @RequestUserForResolver() user: RequestUserDto,
  ): Promise<User> {
    const { id } = user;
    return this.userService.findUserById(id);
  }
}
