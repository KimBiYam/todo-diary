import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import DiaryItem from './DiaryItem';

export type DiaryListProps = {};

const DiaryList = () => {
  const { data: diaries } = useDiariesQuery({
    refetchOnWindowFocus: false,
  });

  return diaries !== undefined ? (
    <div>
      {diaries.map((diary) => (
        <DiaryItem key={diary.id} diary={diary} />
      ))}
    </div>
  ) : (
    <></>
  );
};

export default DiaryList;
