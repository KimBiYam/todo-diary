import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleTokenDto } from './dto';

@Controller('api/auth')
@ApiTags('Auth')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger('AuthController');

  @Get('/google/check')
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  async checkGoogleAccount(
    @Query() { googleToken }: GoogleTokenDto,
  ): Promise<{ exists: boolean }> {
    const isExists = await this.authService.isExistsGoogleAccount(googleToken);
    return { exists: isExists };
  }

  @Post('/google/sign-in')
  @ApiResponse({ status: 200, description: '로그인 성공' })
  async googleLogin(@Body() { googleToken }: GoogleTokenDto): Promise<any> {
    return await this.authService.googleLogin(googleToken);
  }

  @Post('/google/sign-up')
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  async signupGoogleAccount(
    @Body() { googleToken }: GoogleTokenDto,
  ): Promise<any> {
    return await this.authService.registerGoogleAccount(googleToken);
  }
}
