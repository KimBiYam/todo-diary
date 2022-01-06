import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { user } from '@src/__fixtures__/user/user';
import { UserService } from '.';
import { RequestUserDto } from './dto';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: UserService, useValue: {} }],
      controllers: [UserController],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findUserProfile', () => {
    it('return user when succeed find user', async () => {
      //given
      const requestUserDto: RequestUserDto = {
        id: '1',
        displayName: 'name',
      };

      userService.findUserById = jest.fn().mockResolvedValue(user);

      //when
      const result = await userController.findUserProfile(requestUserDto);

      //then
      expect(result).toEqual({ user });
    });

    it('throw error when failed find user', async () => {
      //given
      const requestUserDto: RequestUserDto = {
        id: '1',
        displayName: 'name',
      };

      userService.findUserById = jest
        .fn()
        .mockRejectedValue(new NotFoundException());

      //when

      //then
      await expect(
        userController.findUserProfile(requestUserDto),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
