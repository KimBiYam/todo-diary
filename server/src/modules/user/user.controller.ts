import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestUser } from '@src/decorators';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from './dto';
import { UserService } from './user.service';

@Controller('api/v1/users')
@ApiTags('Users')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiOperation({ summary: '로그인 된 자신의 프로필 가져오기' })
  @ApiResponse({ status: 200, description: '유저 프로필 조회 성공' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findUserProfile(@RequestUser() user: RequestUserDto) {
    const { id } = user;
    const findUser = await this.userService.findUserById(id);
    return { user: findUser };
  }
}
