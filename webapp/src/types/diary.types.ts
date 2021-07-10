export type Diary = {
  id: number;
  createdAt: Date;
  isFinished: boolean;
  title: string;
  content: string;
};

export type GetDiariesResponseData = {
  diaries: Diary[];
};
