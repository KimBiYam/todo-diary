import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleOption } from '@src/config';
import { SocialAccount, User } from '@src/entities';
import { SocialAccountRepository } from '@src/modules/auth/social-account.repository';
import { getMariaDBTestTypeOrmModule } from '@src/test/util/getMariaDBTestTypeOrmModule';
import { UserModule } from '..';
import { UserRepository } from '../user.repository';

describe('User (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;
  let socialAccountRepository: SocialAccountRepository;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        ConfigModule.forRoot(configModuleOption),
        getMariaDBTestTypeOrmModule(),
        TypeOrmModule.forFeature([User, SocialAccount]),
      ],
      providers: [UserRepository, SocialAccountRepository],
    }).compile();

    app = moduleRef.createNestApplication();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
    socialAccountRepository = moduleRef.get<SocialAccountRepository>(
      SocialAccountRepository,
    );

    await app.init();
  });

  afterEach(async () => {
    await userRepository.delete({});
    await socialAccountRepository.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/v1/users/me (GET)', () => {
    it('test', () => {
      expect(userRepository).toBeDefined();
      expect(socialAccountRepository).toBeDefined();
    });
  });
});
