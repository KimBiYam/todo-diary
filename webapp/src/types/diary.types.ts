export type Diary = {
  id: number;
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
