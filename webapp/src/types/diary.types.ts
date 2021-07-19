export type Diary = {
  id: number;
  createdAt: Date;
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
