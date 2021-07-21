import { css } from '@emotion/react';
import { useEffect, useMemo, useRef } from 'react';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import DiaryItem from './DiaryItem';
import DiaryItemSkeleton from './DiaryItemSkeleton';

export type DiaryListProps = {};

const PAGE_LIMIT = 12;

const DiaryList = () => {
  const lastItemRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    useDiariesQuery(PAGE_LIMIT, {
      refetchOnWindowFocus: false,
    });

  useEffect(() => {}, []);

  const isShowSkeleton = useMemo(
    () => (hasNextPage && isFetching) || isLoading,
    [hasNextPage, isFetching, isLoading],
  );

  return (
    <div css={block}>
      <div css={diariesSection}>
        {data &&
          data.pages.map((diaries) =>
            diaries.map((diary) => <DiaryItem key={diary.id} diary={diary} />),
          )}
        <div ref={lastItemRef}></div>
        {isShowSkeleton &&
          Array.from({ length: PAGE_LIMIT }).map((_, index) => (
            <DiaryItemSkeleton key={index} />
          ))}
        <button type="button" onClick={() => fetchNextPage()}>
          next
        </button>
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
