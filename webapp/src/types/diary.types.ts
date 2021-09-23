export type Diary = {
  id: string;
  createdAt: string;
  isFinished: boolean;
  title: string;
  content: string;
};

export type DiariesResponse = {
  diaries: Diary[];
};

export type DiaryResponse = {
  diary: Diary;
};

export type DiariesAchievementRateResponse = {
  achievementRate: string;
};

export type DiariesStatisticsResponse = {
  diariesStatisticsByYear: DiariesStatistics[];
};

export type DiariesStatistics = {
  month: number;
  totalCount: number;
  finishedDiariesCount: number;
};

export type UpdateDiaryParams = {
  id: string;
  title?: string;
  content?: string;
  isFinished?: boolean;
};

export type DatesTheDiaryExistsQueryParams = {
  year: number;
  month: number;
};
