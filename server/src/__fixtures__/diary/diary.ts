import { Diary } from '@src/entities';
import { user } from '../user/user';

export const diary: Diary = {
  id: '1',
  createdAt: new Date('2020-01-01'),
  isFinished: false,
  title: 'title',
  serialize: jest.fn(),
  user: user,
  diaryMeta: {
    id: '1',
    content: 'content',
    diary: undefined,
  },
};
