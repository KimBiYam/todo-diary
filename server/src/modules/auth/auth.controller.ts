import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '@src/decorators/request-user.decorator';
import { AuthService } from './auth.service';
import { SocialAcountDto, GoogleAccessTokenDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api/auth')
@ApiTags('Auth')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger('AuthController');

  @Get('/google/profile')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  async signinGoogleAccount(@RequestUser() user: any): Promise<any> {
    const { accessToken: googleAccessToken } = user;
    return await this.authService.getGoogleProfile(googleAccessToken);
  }

  @Get('/google/signin')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({ status: 200, description: '로그인 성공' })
  async signinGoogleCallback(@RequestUser() user: any): Promise<any> {
    const { accessToken: googleAccessToken } = user;
    return await this.authService.googleLogin(googleAccessToken);
  }

  @Post('/google/signup')
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  async signupGoogleAccount(
    @Body() { googleAccessToken }: GoogleAccessTokenDto,
  ): Promise<any> {
    return await this.authService.registerGoogleAccount(googleAccessToken);
  }

  @Post('/google/check')
  async checkGoogleAuth(
    @Body() body: GoogleAccessTokenDto,
  ): Promise<{ user: SocialAcountDto; googleAccessToken: string }> {
    const { googleAccessToken } = body;
    return await this.authService.getGoogleProfile(googleAccessToken);
  }

  @Get('/test')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async testToken() {
    return true;
  }
}
