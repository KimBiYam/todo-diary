import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { google } from 'googleapis';
import { SocialAccount, User } from '@src/entities';
import { UserService } from '@src/modules/user';
import { SocialAcountDto } from './dto';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
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

  async googleLogin(accessToken: string): Promise<any> {
    const { user: socialAcountDto } = await this.getGoogleProfile(accessToken);
    const { email } = socialAcountDto;

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('This user is not exist!');
    }

    return await this.login(user);
  }

  async getGoogleProfile(
    accessToken: string,
  ): Promise<{ user: SocialAcountDto; accessToken: string }> {
    const { data } = await google.people('v1').people.get({
      access_token: accessToken,
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

    return { user: socialAccountDto, accessToken };
  }

  @Transaction({ isolation: 'SERIALIZABLE' })
  async registerGoogleAccount(
    accessToken: string,
    @TransactionManager() manager?: EntityManager,
  ): Promise<any> {
    const { user: socialAccountDto } = await this.getGoogleProfile(accessToken);

    const {
      socialId,
      email,
      displayName,
      photoUrl,
      provider,
    } = socialAccountDto;

    const findUser = await this.userService.findUserByEmail(email);

    if (findUser) {
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
