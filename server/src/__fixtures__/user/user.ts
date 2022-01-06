import { User } from '@src/entities';

export const user: User = {
  id: '1',
  createdAt: new Date('2020-01-01'),
  email: 'test@test.com',
  diaries: [],
  isCertified: true,
  displayName: 'displayName',
  username: 'username',
};
