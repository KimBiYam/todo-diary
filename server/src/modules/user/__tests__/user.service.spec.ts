import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { user } from '@src/test/__fixtures__/user/user';
import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';

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
    it('should return user when succeed find user', async () => {
      // given
      const id = '1';

      userRepository.findOne = jest.fn().mockResolvedValue(user);

      // when
      const result = await userService.findUserById(id);

      // then
      expect(result).toEqual(user);
    });

    it('should throw exception when user not exists', async () => {
      // given
      const id = '1';

      userRepository.findOne = jest.fn().mockResolvedValue(null);

      // when

      // then
      await expect(userService.findUserById(id)).rejects.toThrowError(
        new NotFoundException('This user is not exists!'),
      );
    });
  });

  describe('findUserByEmail', () => {
    it('should return user when succeed find user', async () => {
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

      userRepository.findOne = jest.fn().mockResolvedValue(null);

      // when

      // then
      await expect(userService.findUserByEmail(email)).rejects.toThrowError(
        new NotFoundException('This user is not exists!'),
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
