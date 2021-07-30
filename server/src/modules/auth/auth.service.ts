import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { google } from 'googleapis';
import { SocialAccount, User } from '@src/entities';
import { UserService } from '@src/modules/user';
import { SocialAcountDto } from './dto';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { SocialAccountRepository } from './social-account.repository';
import { isDataExists } from '@src/util/common.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  async googleLogin(googleToken: string): Promise<any> {
    try {
      const socialAcountDto = await this.getGoogleProfile(googleToken);
      const { email, photoUrl, displayName } = socialAcountDto;

      const user = await this.userService.findUserByEmail(email);

      if (!isDataExists(user)) {
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

  async getGoogleProfile(googleToken: string): Promise<SocialAcountDto> {
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

      const socialAccountDto: SocialAcountDto = {
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

  async isExistsGoogleAccount(googleToken: string) {
    const socialAccountDto = await this.getGoogleProfile(googleToken);
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
  async createGoogleAccount(
    googleToken: string,
    @TransactionManager() manager?: EntityManager,
  ): Promise<any> {
    const socialAccountDto = await this.getGoogleProfile(googleToken);

    const {
      socialId,
      email,
      displayName,
      photoUrl,
      provider,
    } = socialAccountDto;

    const foundUser = await this.userService.findUserByEmail(email);

    if (isDataExists(foundUser)) {
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
}
