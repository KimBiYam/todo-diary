import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@src/decorators';
import { User } from '@src/entities';
import { UserService } from '../user';
import { AuthService } from './auth.service';
import { GoogleTokenDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api/auth')
@ApiTags('Auth')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  private readonly logger = new Logger('AuthController');

  @Get('/user/profile')
  @ApiResponse({ status: 200, description: '유저 프로필 조회 성공' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findUserProfile(@RequestUser() user: User) {
    const { email } = user;
    const findUser = await this.userService.findUserByEmail(email);
    return { user: findUser };
  }

  @Get('/google/check')
  @ApiResponse({ status: 200, description: '유저 존재여부 조회 성공' })
  async checkGoogleAccount(
    @Query() { googleToken }: GoogleTokenDto,
  ): Promise<any> {
    const isExists = await this.authService.isExistsGoogleAccount(googleToken);
    return { isExists };
  }

  @Post('/google/sign-in')
  @ApiResponse({ status: 200, description: '구글 소셜 로그인 성공' })
  async googleLogin(@Body() { googleToken }: GoogleTokenDto): Promise<any> {
    return await this.authService.googleLogin(googleToken);
  }

  @Post('/google/sign-up')
  @ApiResponse({ status: 201, description: '구글 소셜 회원가입 성공' })
  async signupGoogleAccount(
    @Body() { googleToken }: GoogleTokenDto,
  ): Promise<any> {
    return await this.authService.createGoogleAccount(googleToken);
  }
}
