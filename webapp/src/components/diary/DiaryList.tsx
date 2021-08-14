import { css } from '@emotion/react';
import { useMemo, useRef } from 'react';
import useUpdateDiaryMutation from '../../hooks/mutation/useUpdateDiaryMutation';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import useScrollObserver from '../../hooks/useScrollObserver';
import { BREAK_POINTS } from '../../styles/breakPoints';
import { Diary } from '../../types/diary.types';
import DiaryItem from './DiaryItem';
import DiaryItemSkeleton from './DiaryItemSkeleton';

export type DiaryListProps = {};

const PAGE_LIMIT = 10;

const DiaryList = () => {
  const scrollableTrigerRef = useRef<HTMLDivElement>(null);
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading, refetch } =
    useDiariesQuery(PAGE_LIMIT);

  const { mutate } = useUpdateDiaryMutation({ onSuccess: () => refetch() });

  const isShowSkeleton = useMemo(
    () => (hasNextPage && isFetching) || isLoading,
    [hasNextPage, isFetching, isLoading],
  );

  useScrollObserver({
    targetRef: scrollableTrigerRef,
    enabled: hasNextPage,
    onIntersect: fetchNextPage,
  });

  const handleClickDiaryItem = (diary: Diary) => {
    const { id, isFinished } = diary;

    mutate({ id, isFinished: !isFinished });
  };

  return (
    <div css={box}>
      <div css={diariesSection}>
        {data &&
          data.pages.map((diaries) =>
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

  ${BREAK_POINTS.large} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default DiaryList;
