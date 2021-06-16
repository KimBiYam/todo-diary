import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger('Auth');

  @Get('/google/signin')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@RequestUser() user: any): Promise<any> {
    return await this.authService.googleLogin(user);
  }

  @Post('/google/check')
  @UseGuards(AuthGuard('google'))
  async checkGoogleAuth(@Body() body: { token: string }): Promise<any> {
    const { token } = body;
    // return await this.authService.getGoogleProfile(token);
  }
}
