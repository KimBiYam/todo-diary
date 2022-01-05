import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonUtil } from '@src/util/common.util';
import { UserService } from '../user';
import { AuthService } from './auth.service';
import { GithubOAuthDTO, GoogleTokenDto } from './dto';

@Controller('api/v1/auth')
@ApiTags('Auth')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/google/check')
  @ApiOperation({ summary: '구글 Social Account 존재여부 가져오기' })
  @ApiResponse({
    status: 200,
    description: '구글 Social Account 존재여부 가져오기',
  })
  async checkGoogleAccount(@Query() { googleToken }: GoogleTokenDto) {
    const socialAccountDto = await this.authService.getGoogleProfile(
      googleToken,
    );

    const isExists = await this.authService.isSocialAccountExists(
      socialAccountDto,
    );

    return { isExists };
  }

  @Post('/google/sign-in')
  @ApiOperation({ summary: '구글 Social Account 로그인' })
  @ApiResponse({ status: 201, description: '구글 Social Account 로그인 성공' })
  async googleLogin(@Body() { googleToken }: GoogleTokenDto) {
    const socialAccountDto = await this.authService.getGoogleProfile(
      googleToken,
    );

    const { email } = socialAccountDto;

    const user = await this.userService.findUserByEmail(email);

    if (!CommonUtil.isDataExists(user)) {
      throw new BadRequestException('This user is not exists!');
    }

    return await this.authService.loginSocialAccount(user, socialAccountDto);
  }

  @Post('/google/sign-up')
  @ApiOperation({ summary: '구글 Social Account 회원가입' })
  @ApiResponse({
    status: 201,
    description: '구글 Social Account 회원가입 성공',
  })
  async signupGoogleAccount(@Body() { googleToken }: GoogleTokenDto) {
    const socialAccountDto = await this.authService.getGoogleProfile(
      googleToken,
    );

    return await this.authService.createSocialAccount(socialAccountDto);
  }

  @Post('/github/sign-in')
  @ApiOperation({
    summary: '깃허브 Social Account 로그인',
    description:
      '깃허브 유저 정보를 가져온 뒤 서버에 존재하지 않는 계정이면 생성 후 로그인합니다',
  })
  @ApiResponse({ status: 201, description: '깃허브 소셜 로그인 성공' })
  async githubLogin(@Body() { code }: GithubOAuthDTO) {
    const socialAccountDto = await this.authService.getSocialAccountDtoByGithubCode(
      code,
    );

    const { email } = socialAccountDto;

    const user = await this.userService.findUserByEmail(email);

    if (!CommonUtil.isDataExists(user)) {
      throw new BadRequestException('This user is not exists!');
    }

    return await this.authService.loginSocialAccount(user, socialAccountDto);
  }
}
