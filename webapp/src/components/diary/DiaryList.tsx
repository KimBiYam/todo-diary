import { css } from '@emotion/react';
import { useState } from 'react';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import DiaryItem from './DiaryItem';
import DiaryItemSkeleton from './DiaryItemSkeleton';

export type DiaryListProps = {};

const PAGE_LIMIT = 12;

const DiaryList = () => {
  const [page, setPage] = useState(1);
  const { data: diaries } = useDiariesQuery(page, PAGE_LIMIT, {
    refetchOnWindowFocus: false,
  });

  return (
    <div css={block}>
      <div css={diariesSection}>
        {diaries !== undefined
          ? diaries.map((diary) => <DiaryItem key={diary.id} diary={diary} />)
          : Array.from({ length: PAGE_LIMIT }).map((_, index) => (
              <DiaryItemSkeleton key={index} />
            ))}
      </div>
    </div>
  );
};

const block = css`
  width: 1300px;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    width: 600px;
  }
`;

const diariesSection = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 10px;
  flex: 1 1 0%;
`;

export default DiaryList;
