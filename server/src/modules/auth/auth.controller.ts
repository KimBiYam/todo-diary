import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOAuth2, ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { AuthService } from './auth.service';
import { RegisterSocialAcountDto } from './dto';
import { AccessTokenDto } from './dto/access-token.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger('Auth');

  @Get('/google/signin')
  @UseGuards(AuthGuard('google'))
  async signinGoogleAccount(@RequestUser() user: any): Promise<any> {
    return await this.authService.googleLogin(user);
  }

  @Post('/google/signup')
  @UseGuards(AuthGuard('google'))
  @ApiOAuth2(['google'])
  async signupGoogleAccount(@Body() body: AccessTokenDto): Promise<any> {
    const { accessToken } = body;
    const registerSocialAcountDto = await this.authService.getGoogleProfile(
      accessToken,
    );

    return await this.authService.registerGoogleAccount(
      registerSocialAcountDto,
    );
  }

  @Post('/google/check')
  @UseGuards(AuthGuard('google'))
  @ApiOAuth2(['google'])
  async checkGoogleAuth(
    @Body() body: AccessTokenDto,
  ): Promise<RegisterSocialAcountDto> {
    const { accessToken } = body;
    return await this.authService.getGoogleProfile(accessToken);
  }
}
