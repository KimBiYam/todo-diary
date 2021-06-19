import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { AuthService } from './auth.service';
import { RegisterSocialAcountDto } from './dto';
import { AccessTokenDto } from './dto/access-token.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger('AuthController');

  @Get('/google/signin')
  @UseGuards(AuthGuard('google'))
  async signinGoogleAccount(@RequestUser() user: any): Promise<any> {
    const { accessToken } = user;
    return await this.authService.googleLogin(accessToken);
  }

  @Post('/google/signup')
  async signupGoogleAccount(@Body() body: AccessTokenDto): Promise<any> {
    const { accessToken } = body;
    return await this.authService.registerGoogleAccount(accessToken);
  }

  @Post('/google/check')
  async checkGoogleAuth(
    @Body() body: AccessTokenDto,
  ): Promise<RegisterSocialAcountDto> {
    const { accessToken } = body;
    return await this.authService.getGoogleProfile(accessToken);
  }

  @Get('/test')
  @UseGuards(AuthGuard('local'))
  @ApiBearerAuth()
  async testToken() {
    return true;
  }
}
