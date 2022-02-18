import { Diary } from '@src/entities';
import { user } from '../user/user';

export const diaries: Diary[] = [
  {
    id: '1',
    createdAt: new Date('2020-01-01'),
    isFinished: false,
    title: 'title1',
    serialize: jest.fn(),
    user: user,
    diaryMeta: {
      id: '1',
      content: 'content1',
      diary: undefined,
    },
  },
  {
    id: '2',
    createdAt: new Date('2020-01-01'),
    isFinished: false,
    title: 'title2',
    serialize: jest.fn(),
    user: user,
    diaryMeta: {
      id: '2',
      content: 'content2',
      diary: undefined,
    },
  },
];
