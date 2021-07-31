import { css } from '@emotion/react';
import { useMemo, useRef } from 'react';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import useScrollObserver from '../../hooks/useScrollObserver';
import DiaryItem from './DiaryItem';
import DiaryItemSkeleton from './DiaryItemSkeleton';

export type DiaryListProps = {};

const PAGE_LIMIT = 10;

const DiaryList = () => {
  const scrollableTrigerRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    useDiariesQuery(PAGE_LIMIT, {
      refetchOnWindowFocus: false,
    });

  const isShowSkeleton = useMemo(
    () => (hasNextPage && isFetching) || isLoading,
    [hasNextPage, isFetching, isLoading],
  );

  useScrollObserver({
    targetRef: scrollableTrigerRef,
    enabled: hasNextPage,
    onIntersect: fetchNextPage,
  });

  return (
    <div css={box}>
      <div css={diariesSection}>
        {data &&
          data.pages.map((diaries) =>
            diaries.map((diary) => <DiaryItem key={diary.id} diary={diary} />),
          )}
        {isShowSkeleton &&
          Array.from({ length: PAGE_LIMIT }).map((_, index) => (
            <DiaryItemSkeleton key={index} />
          ))}
      </div>
      {hasNextPage && <div ref={scrollableTrigerRef} />}
    </div>
  );
};

const box = css`
  padding-top: 2rem;
  display: flex;
  justify-content: center;
`;

const diariesSection = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export default DiaryList;
