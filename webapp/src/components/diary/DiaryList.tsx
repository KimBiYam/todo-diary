import { css } from '@emotion/react';
import { useMemo, useRef } from 'react';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import useScrollObserver from '../../hooks/useScrollObserver';
import DiaryItem from './DiaryItem';
import DiaryItemSkeleton from './DiaryItemSkeleton';

export type DiaryListProps = {};

const PAGE_LIMIT = 12;

const DiaryList = () => {
  const fetchMoreElementRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    useDiariesQuery(PAGE_LIMIT, {
      refetchOnWindowFocus: false,
    });

  const isShowSkeleton = useMemo(
    () => (hasNextPage && isFetching) || isLoading,
    [hasNextPage, isFetching, isLoading],
  );

  useScrollObserver({
    targetRef: fetchMoreElementRef,
    enabled: hasNextPage,
    onIntersect: fetchNextPage,
  });

  return (
    <>
      <div css={block}>
        <div css={diariesSection}>
          {data &&
            data.pages.map((diaries) =>
              diaries.map((diary) => (
                <DiaryItem key={diary.id} diary={diary} />
              )),
            )}
          {isShowSkeleton &&
            Array.from({ length: PAGE_LIMIT }).map((_, index) => (
              <DiaryItemSkeleton key={index} />
            ))}
        </div>
      </div>
      <div ref={fetchMoreElementRef} />
    </>
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
