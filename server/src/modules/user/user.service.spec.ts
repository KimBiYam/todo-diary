import { Test, TestingModule } from '@nestjs/testing';
import { user } from '@src/__fixtures__/user/user';
import { EntityNotFoundError } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: UserRepository, useValue: {} }],
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

      userRepository.findOne = jest.fn().mockResolvedValue(user);

      // when
      const result = await userService.findUserByEmail(email);

      // then
      expect(result).toEqual(user);
    });

    it('should failure when user not exists', async () => {
      // given
      const email = 'test@test.co.kr';

      userRepository.findOne = jest.fn().mockRejectedValue(EntityNotFoundError);

      // when

      // then
      await expect(userService.findUserByEmail(email)).rejects.toEqual(
        EntityNotFoundError,
      );
    });
  });

  describe('updateUser', () => {
    it('should response updated user when success update user', async () => {
      // given
      const changeDisplayName = 'changeDisplayName';

      userRepository.save = jest
        .fn()
        .mockResolvedValue({ ...user, displayName: changeDisplayName });

      // when
      const result = await userService.updateUser({
        ...user,
        displayName: changeDisplayName,
      });

      // then
      expect(result.displayName).toEqual(changeDisplayName);
    });
  });
});
