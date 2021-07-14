import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@src/decorators';
import { User } from '@src/entities';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('api/users')
@ApiTags('Users')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiResponse({ status: 200, description: '유저 프로필 조회 성공' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findUserProfile(@RequestUser() user: User) {
    const { email } = user;
    const findUser = await this.userService.findUserByEmail(email);
    return { user: findUser };
  }
}
