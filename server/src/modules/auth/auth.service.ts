import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { google } from 'googleapis';
import { SocialAccount, User } from '@src/entities';
import { SocialAccountDto } from './dto';
import { DataSource } from 'typeorm';
import { SocialAccountRepository } from './social-account.repository';
import { CommonUtil } from '@src/util/common.util';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/user.repository';
import { HttpService } from '@nestjs/axios';

const API_GITHUB_ACCESS_TOKEN = 'https://github.com/login/oauth/access_token';
const API_GITHUB_USER = 'https://api.github.com/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly socialAccountRepository: SocialAccountRepository,
    private readonly dataSource: DataSource,
  ) {}

  private readonly logger = new Logger('AuthService');

  async login(user: User) {
    const { id, displayName } = user;

    const payload = { id, displayName };

    // TODO : Apply refresh token
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async loginSocialAccount(user: User, socialAccountDto: SocialAccountDto) {
    const { photoUrl, displayName } = socialAccountDto;

    if (photoUrl !== user.photoUrl || displayName !== user.displayName) {
      await this.userRepository.save({ ...user, photoUrl, displayName });
    }

    return await this.login(user);
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

  async createSocialAccount(socialAccountDto: SocialAccountDto) {
    const { socialId, email, displayName, photoUrl, provider } =
      socialAccountDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const foundUser = await queryRunner.connection
      .getRepository(User)
      .findOne({ where: { email } });

    if (CommonUtil.isDataExists(foundUser)) {
      throw new BadRequestException('This user is exists!');
    }

    try {
      await queryRunner.startTransaction();

      const user = new User();
      user.isCertified = true;
      user.email = email;
      user.photoUrl = photoUrl ?? undefined;
      user.displayName = displayName;

      const socialAccount = new SocialAccount();
      socialAccount.provider = provider;
      socialAccount.socialId = socialId;
      socialAccount.user = user;

      await queryRunner.manager.getRepository(User).save(user);

      await queryRunner.manager
        .getRepository(SocialAccount)
        .save(socialAccount);

      await queryRunner.commitTransaction();

      return true;
    } catch (e) {
      queryRunner.rollbackTransaction();
      throw e;
    } finally {
      queryRunner.release();
    }
  }

  async getSocialAccountDtoByGithubCode(code: string) {
    const githubToken = await this.getGithubAccessToken(code);

    const socialAccountDto = await this.getGithubProfile(githubToken);

    const isSocialAccountExists = await this.isSocialAccountExists(
      socialAccountDto,
    );

    if (!isSocialAccountExists) {
      await this.createSocialAccount(socialAccountDto);
    }

    return socialAccountDto;
  }

  async getGithubAccessToken(code: string) {
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
      login,
      name,
      id: socialId,
      email,
      avatar_url: photoUrl,
    } = response.data;

    const socialAccountDto: SocialAccountDto = {
      displayName: name ?? login,
      photoUrl,
      email,
      socialId,
      provider: 'github',
    };

    return socialAccountDto;
  }
}
