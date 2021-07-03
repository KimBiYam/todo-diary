import { Diary } from '../../types/diary.types';

export type DiaryItemProps = {
  diary: Diary;
};

const DiaryItem = ({ diary }: DiaryItemProps) => {
  const { title } = diary;

  return (
    <div>
      <p>title : {title}</p>
    </div>
  );
};

export default DiaryItem;
