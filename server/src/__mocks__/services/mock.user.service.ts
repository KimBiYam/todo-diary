import { Provider } from '@nestjs/common';
import { UserService } from '@src/modules/user';

export const mockUserService: Provider = {
  provide: UserService,
  useValue: {
    findUserById: jest.fn(),
    findUserByEmail: jest.fn(),
    updateUser: jest.fn(),
  },
};
