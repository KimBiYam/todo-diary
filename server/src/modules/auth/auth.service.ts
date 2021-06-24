import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { google } from 'googleapis';
import { SocialAccount, User } from '@src/entities';
import { UserService } from '@src/modules/user';
import { SocialAcountDto } from './dto';
import { SocialAccountRepository } from './social-account.repository';
import { UserRepository } from '../user/user.repository';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly socialAccountRepository: SocialAccountRepository,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger('AuthService');

  async login(user: User) {
    const { email, displayName } = user;

    const payload = { username: email, sub: displayName };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async googleLogin(googleAccessToken: string): Promise<any> {
    const { user: socialAcountDto } = await this.getGoogleProfile(
      googleAccessToken,
    );
    const { email } = socialAcountDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('This user is not exist!');
    }

    return await this.login(user);
  }

  async getGoogleProfile(
    googleAccessToken: string,
  ): Promise<{ user: SocialAcountDto; googleAccessToken: string }> {
    const { data } = await google.people('v1').people.get({
      access_token: googleAccessToken,
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

    this.logger.debug(socialAccountDto);
    return { user: socialAccountDto, googleAccessToken };
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  async registerGoogleAccount(
    googleAccessToken: string,
    @TransactionManager() manager?: EntityManager,
  ): Promise<any> {
    const { user: socialAccountDto } = await this.getGoogleProfile(
      googleAccessToken,
    );

    const {
      socialId,
      email,
      displayName,
      photoUrl,
      provider,
    } = socialAccountDto;

    const isExist = await this.userRepository.findOne({
      where: { email },
    });

    if (isExist) {
      throw new BadRequestException('This user is exist');
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
