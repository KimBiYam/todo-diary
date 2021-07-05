export type Diary = {
  id: number;
  createdAt: Date;
  inFinished: boolean;
  title: string;
  content: string;
};

export type GetDiariesResponseData = {
  diaries: Diary[];
};
