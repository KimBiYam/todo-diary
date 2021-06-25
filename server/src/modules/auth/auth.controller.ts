import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestGoogleUser } from '@src/decorators';
import { GoogleUserDto } from '../user/dto/google-user.dto';
import { AuthService } from './auth.service';
import { AccessTokenDto, SocialAcountDto } from './dto';
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
  async signinGoogleAccount(
    @RequestGoogleUser() googleUserDto: GoogleUserDto,
  ): Promise<any> {
    const { accessToken } = googleUserDto;
    return await this.authService.getGoogleProfile(accessToken);
  }

  @Get('/google/signin')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({ status: 200, description: '로그인 성공' })
  async signinGoogleCallback(
    @RequestGoogleUser() googleUserDto: GoogleUserDto,
  ): Promise<any> {
    const { accessToken } = googleUserDto;
    return await this.authService.googleLogin(accessToken);
  }

  @Post('/google/signup')
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  async signupGoogleAccount(
    @Body() { accessToken }: AccessTokenDto,
  ): Promise<any> {
    return await this.authService.registerGoogleAccount(accessToken);
  }

  @Post('/google/check')
  async checkGoogleAuth(
    @Body() body: AccessTokenDto,
  ): Promise<{ user: SocialAcountDto; accessToken: string }> {
    const { accessToken } = body;
    return await this.authService.getGoogleProfile(accessToken);
  }

  @Get('/test')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async testToken() {
    return true;
  }
}
