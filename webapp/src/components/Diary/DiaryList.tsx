import React from 'react';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import DiaryItem from './DiaryItem';

export type DiaryListProps = {};

function DiaryList() {
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
}

export default DiaryList;
