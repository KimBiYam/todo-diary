import { css } from '@emotion/react';
import { useCallback, useMemo, useRef } from 'react';
import { useHistory } from 'react-router';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import useScrollObserver from '../../hooks/useScrollObserver';
import { BREAK_POINTS } from '../../styles/breakPoints';
import { Diary } from '../../types/diary.types';
import DiaryItem from './DiaryItem';
import DiaryItemSkeleton from './DiaryItemSkeleton';

export type DiaryListProps = {};

const PAGE_LIMIT = 10;

const DiaryList = () => {
  const history = useHistory();
  const scrollableTrigerRef = useRef<HTMLDivElement>(null);
  const {
    data: diaries,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isLoading,
  } = useDiariesQuery(PAGE_LIMIT);

  const isShowSkeleton = useMemo(
    () => (hasNextPage && isFetching) || isLoading,
    [hasNextPage, isFetching, isLoading],
  );

  useScrollObserver({
    targetRef: scrollableTrigerRef,
    enabled: hasNextPage,
    onIntersect: fetchNextPage,
  });

  const handleClickDiaryItem = useCallback(
    (diary: Diary) => history.push(`/diary/${diary.id}`),
    [],
  );

  return (
    <div css={box}>
      {diaries &&
        diaries.pages.map((diaries) =>
          diaries.map((diary) => (
            <DiaryItem
              key={diary.id}
              diary={diary}
              onClick={handleClickDiaryItem}
            />
          )),
        )}
      {isShowSkeleton &&
        Array.from({ length: PAGE_LIMIT }).map((_, index) => (
          <DiaryItemSkeleton key={index} />
        ))}
      {hasNextPage && <div ref={scrollableTrigerRef} />}
    </div>
  );
};

const box = css`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));

  ${BREAK_POINTS.medium} {
    grid-template-columns: repeat(auto-fill, minmax(36rem, 1fr));
  }

  ${BREAK_POINTS.large} {
    grid-template-columns: repeat(auto-fill, minmax(48rem, 1fr));
  }
`;

export default DiaryList;
