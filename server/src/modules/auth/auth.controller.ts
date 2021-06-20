import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { AuthService } from './auth.service';
import { SocialAcountDto } from './dto';
import { AccessTokenDto } from './dto/access-token.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger('AuthController');

  @Get('/google/signin')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({ status: 201, description: '로그인 성공' })
  async signinGoogleAccount(): Promise<any> {}

  @Get('/google/signin/redirect')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({ status: 201, description: '로그인 성공' })
  async signinGoogleCallback(@RequestUser() user: any): Promise<any> {
    const { accessToken } = user;
    return await this.authService.googleLogin(accessToken);
  }

  @Post('/google/signup')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  async signupGoogleAccount(@RequestUser() user: any): Promise<any> {
    const { accessToken } = user;
    return await this.authService.registerGoogleAccount(accessToken);
  }

  @Post('/google/check')
  async checkGoogleAuth(
    @Body() body: AccessTokenDto,
  ): Promise<SocialAcountDto> {
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
