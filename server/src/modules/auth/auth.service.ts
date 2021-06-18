import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { SocialAccount } from 'src/entities/socialAccount';
import { Repository } from 'typeorm';
import { RegisterSocialAcountDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SocialAccount)
    private readonly socialAccountRepository: Repository<SocialAccount>,
  ) {}

  private readonly logger = new Logger('AuthService');

  async googleLogin(user: any) {
    const { accessToken } = user;

    return {
      accessToken,
    };
  }

  async getGoogleProfile(
    accessToken: string,
  ): Promise<RegisterSocialAcountDto> {
    const { data } = await google.people('v1').people.get({
      access_token: accessToken,
      resourceName: 'people/me',
      personFields: 'names,emailAddresses,photos',
    });

    const displayName = data.names[0].displayNameLastFirst;
    const picture = data.photos[0].url;
    const email = data.emailAddresses[0].value;
    const socialId = data.names[0].metadata.source.id;

    const registerSocialAccountDto: RegisterSocialAcountDto = {
      displayName,
      picture,
      email,
      socialId,
      provider: 'google',
    };

    this.logger.debug(registerSocialAccountDto);
    return registerSocialAccountDto;
  }

  async registerGoogleAccount(
    registerSocialAcountDto: RegisterSocialAcountDto,
  ): Promise<any> {
    this.logger.debug(registerSocialAcountDto);
    return true;
  }
}
