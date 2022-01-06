import { Provider } from '@nestjs/common';
import { DiaryService } from '@src/modules/diary';

export const mockDiaryService: Provider = {
  provide: DiaryService,
  useValue: {
    findMyDiaries: jest.fn(),
    findMyDiariesByPage: jest.fn(),
    findDiariesByDateWithPage: jest.fn(),
    findMyDiary: jest.fn(),
    findDiariesByYear: jest.fn(),
    findDiariesByMonth: jest.fn(),
    createDiary: jest.fn(),
    updateMyDiary: jest.fn(),
    deleteMyDiary: jest.fn(),
    getDiariesStatisticsByYear: jest.fn(),
    getDatesTheDiaryExists: jest.fn(),
    groupDiariesByMonth: jest.fn(),
    getDiariesStatistics: jest.fn(),
  },
};
