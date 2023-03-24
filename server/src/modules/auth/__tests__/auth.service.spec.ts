import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { dataSourceMock } from '@src/test/__mocks__/typeorm/mock.data-source';
import { DataSource } from 'typeorm';
import { UserService } from '../../user';
import { UserRepository } from '../../user/user.repository';
import { AuthService } from '../auth.service';
import { SocialAccountRepository } from '../social-account.repository';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: HttpService, useValue: {} },
        { provide: ConfigService, useValue: {} },
        { provide: SocialAccountRepository, useValue: {} },
        { provide: UserRepository, useValue: {} },
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
