import {
  BadRequestException,
  HttpService,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { google } from 'googleapis';
import { SocialAccount, User } from '@src/entities';
import { UserService } from '@src/modules/user';
import { SocialAccountDto } from './dto';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { SocialAccountRepository } from './social-account.repository';
import { CommonUtil } from '@src/util/common.util';
import { ConfigService } from '@nestjs/config';

const API_GITHUB_ACCESS_TOKEN = 'https://github.com/login/oauth/access_token';
const API_GITHUB_USER = 'https://api.github.com/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly socialAccountRepository: SocialAccountRepository,
  ) {}

  private readonly logger = new Logger('AuthService');

  async login(user: User) {
    const { email, displayName } = user;

    const payload = { username: email, sub: displayName };

    // TODO : Apply refresh token
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async loginSocialAccount(socialAccountDto: SocialAccountDto) {
    try {
      const { email, photoUrl, displayName } = socialAccountDto;

      const user = await this.userService.findUserByEmail(email);

      if (!CommonUtil.isDataExists(user)) {
        throw new BadRequestException('This user is not exists!');
      }

      if (photoUrl !== user.photoUrl || displayName !== user.displayName) {
        await this.userService.updateUser({ ...user, photoUrl, displayName });
      }

      return await this.login(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async getGoogleProfile(googleToken: string): Promise<SocialAccountDto> {
    try {
      const { data } = await google.people('v1').people.get({
        access_token: googleToken,
        resourceName: 'people/me',
        personFields: 'names,emailAddresses,photos',
      });

      const displayName = data.names[0].displayNameLastFirst;
      const photoUrl = data.photos[0].url;
      const email = data.emailAddresses[0].value;
      const socialId = data.names[0].metadata.source.id;

      const socialAccountDto: SocialAccountDto = {
        displayName,
        photoUrl,
        email,
        socialId,
        provider: 'google',
      };

      return socialAccountDto;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async isSocialAccountExists(socialAccountDto: SocialAccountDto) {
    const { provider, socialId } = socialAccountDto;

    const socialAccount = await this.socialAccountRepository.findOne({
      where: {
        provider,
        socialId,
      },
    });

    return !!socialAccount;
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  async createSocialAccount(
    socialAccountDto: SocialAccountDto,
    @TransactionManager() manager?: EntityManager,
  ) {
    const {
      socialId,
      email,
      displayName,
      photoUrl,
      provider,
    } = socialAccountDto;

    const foundUser = await this.userService.findUserByEmail(email);

    if (CommonUtil.isDataExists(foundUser)) {
      throw new BadRequestException('This user is exists!');
    }

    const user = new User();
    user.isCertified = true;
    user.email = email;
    user.photoUrl = photoUrl ?? undefined;
    user.displayName = displayName;

    const socialAccount = new SocialAccount();
    socialAccount.provider = provider;
    socialAccount.socialId = socialId;
    socialAccount.user = user;

    await manager.save(user);
    return await manager.save(socialAccount);
  }

  async getgithubAccessToken(code: string) {
    const githubClientId = this.configService.get('GITHUB_CLIENT_ID');
    const githubClientSecret = this.configService.get('GITHUB_SECRET');

    const response = await this.httpService
      .post(
        API_GITHUB_ACCESS_TOKEN,
        {
          code,
          client_id: githubClientId,
          client_secret: githubClientSecret,
        },
        {
          headers: { Accept: 'application/json' },
        },
      )
      .toPromise();

    const { access_token: githubToken } = response.data;

    return githubToken;
  }

  async getGithubProfile(githubToken: string) {
    const response = await this.httpService
      .get(API_GITHUB_USER, {
        headers: { Authorization: `Bearer ${githubToken}` },
      })
      .toPromise();

    const {
      name: displayName,
      id: socialId,
      email,
      avatar_url: photoUrl,
    } = response.data;

    const socialAccountDto: SocialAccountDto = {
      displayName,
      photoUrl,
      email,
      socialId,
      provider: 'github',
    };

    return socialAccountDto;
  }

  async registerGithubAccount(socialAccountDto: SocialAccountDto) {
    const isExists = await this.isSocialAccountExists(socialAccountDto);

    if (isExists) {
      return await this.loginSocialAccount(socialAccountDto);
    }

    return await this.createSocialAccount(socialAccountDto);
  }
}
