import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@src/entities';
import { EntityNotFoundError } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findUserByEmail', () => {
    it('should success when user exists', async () => {
      // given
      const email = 'test@test.co.kr';

      const sampleUser: User = {
        id: '1',
        createdAt: new Date(),
        diaries: [],
        displayName: 'displayName',
        isCertified: true,
        email,
      };

      userRepository.findOne = jest.fn().mockResolvedValue(sampleUser);

      // when
      const result = await userService.findUserByEmail(email);

      // then
      expect(result).toEqual(sampleUser);
    });

    it('should failure when user not exists', async () => {
      // given
      const email = 'test@test.co.kr';

      // when
      userRepository.findOne = jest.fn().mockRejectedValue(EntityNotFoundError);

      // then
      await expect(userService.findUserByEmail(email)).rejects.toEqual(
        EntityNotFoundError,
      );
    });
  });

  describe('updateUser', () => {
    it('should response updated user when success update user', async () => {
      // given
      const changeDisplayName = 'test@test.co.kr';

      const sampleUser: User = {
        id: '1',
        createdAt: new Date(),
        diaries: [],
        displayName: 'displayName',
        isCertified: true,
        email: 'test@test.co.kr',
      };

      userRepository.save = jest.fn().mockImplementation((user: User) => user);

      // when
      const result = await userService.updateUser({
        ...sampleUser,
        displayName: changeDisplayName,
      });

      // then
      expect(result.displayName).toEqual(changeDisplayName);
    });
  });
});
