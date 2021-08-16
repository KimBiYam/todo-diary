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
  totalCount: number;
  finishedDiariesCount: number;
};

export type UpdateDiaryParams = {
  id: string;
  title?: string;
  content?: string;
  isFinished?: boolean;
};
