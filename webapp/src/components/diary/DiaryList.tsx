import { css } from '@emotion/react';
import { useCallback, useMemo, useRef } from 'react';
import { useHistory } from 'react-router';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import useScrollObserver from '../../hooks/useScrollObserver';
import LoadingPage from '../../pages/LoadingPage';
import { BREAK_POINTS } from '../../styles/breakPoints';
import { Diary } from '../../types/diary.types';
import dateUtil from '../../utils/dateUtil';
import DiaryEmptyError from './DiaryEmptyError';
import DiaryItem from './DiaryItem';
import DiaryItemSkeleton from './DiaryItemSkeleton';

export type DiaryListProps = {
  selectedDate: Date | undefined;
};

const PAGE_LIMIT = 10;

const DiaryList = ({ selectedDate }: DiaryListProps) => {
  const history = useHistory();
  const scrollableTriggerRef = useRef<HTMLDivElement>(null);

  const {
    data: diaries,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
  } = useDiariesQuery({
    limit: PAGE_LIMIT,
    createdDate:
      selectedDate && dateUtil.getFormattedDate(selectedDate.toDateString()),
  });

  const isShowSkeleton = useMemo(
    () => isFetchingNextPage || isLoading,
    [isFetchingNextPage, isLoading],
  );

  useScrollObserver({
    targetRef: scrollableTriggerRef,
    enabled: hasNextPage,
    onIntersect: fetchNextPage,
  });

  const handleDiaryItemClick = useCallback(
    (diary: Diary) => history.push(`/diary/${diary.id}`),
    [],
  );

  if (diaries?.pages[0].length === 0) {
    return <DiaryEmptyError />;
  }

  if (isFetching && !isFetchingNextPage && !isLoading) {
    return <LoadingPage />;
  }

  return (
    <div css={diarySection}>
      {diaries &&
        diaries.pages.map((diaries) =>
          diaries.map((diary) => (
            <DiaryItem
              key={diary.id}
              diary={diary}
              onClick={handleDiaryItemClick}
            />
          )),
        )}
      {isShowSkeleton &&
        Array.from({ length: PAGE_LIMIT }).map((_, index) => (
          <DiaryItemSkeleton key={index} />
        ))}
      {hasNextPage && !isFetchingNextPage && <div ref={scrollableTriggerRef} />}
    </div>
  );
};

const diarySection = css`
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
