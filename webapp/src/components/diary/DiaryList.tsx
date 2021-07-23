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
    <>
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
    </>
  );
};

const diariesSection = css`
  padding-top: 2rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 1 1 0%;
`;

export default DiaryList;
