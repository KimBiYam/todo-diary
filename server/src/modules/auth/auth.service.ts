import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { User } from 'src/entities';
import { SocialAccount } from 'src/entities/socialAccount';
import { Repository } from 'typeorm';
import { UserService } from '../user';
import { SocialAcountDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SocialAccount)
    private readonly socialAccountRepository: Repository<SocialAccount>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger('AuthService');

  async login(socialAccountDto: SocialAcountDto) {
    const { email, displayName } = socialAccountDto;

    const payload = { username: email, sub: displayName };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(accessToken: string): Promise<any> {
    const socialAcountDto = await this.getGoogleProfile(accessToken);
    const { email } = socialAcountDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('This user is not exist!');
    }

    return await this.login(socialAcountDto);
  }

  async getGoogleProfile(accessToken: string): Promise<SocialAcountDto> {
    const { data } = await google.people('v1').people.get({
      access_token: accessToken,
      resourceName: 'people/me',
      personFields: 'names,emailAddresses,photos',
    });

    const displayName = data.names[0].displayNameLastFirst;
    const picture = data.photos[0].url;
    const email = data.emailAddresses[0].value;
    const socialId = data.names[0].metadata.source.id;

    const registerSocialAccountDto: SocialAcountDto = {
      displayName,
      picture,
      email,
      socialId,
      provider: 'google',
    };

    this.logger.debug(registerSocialAccountDto);
    return registerSocialAccountDto;
  }

  async registerGoogleAccount(accessToken: string): Promise<any> {
    const SocialAcountDto = await this.getGoogleProfile(accessToken);

    const { socialId, email, displayName, picture, provider } = SocialAcountDto;

    const isExist = await this.userRepository.findOne({
      where: { email },
    });

    if (isExist) {
      throw new BadRequestException('This user is exist');
    }

    const user = new User();
    user.displayName = socialId;
    user.isCertified = true;
    user.email = email;
    user.picture = picture ?? undefined;
    user.displayName = displayName;
    await this.userRepository.save(user);

    const socialAccount = new SocialAccount();
    socialAccount.provider = provider;
    socialAccount.socialId = socialId;
    socialAccount.user = user;

    const result = await this.socialAccountRepository.save(socialAccount);

    return result;
  }
}
