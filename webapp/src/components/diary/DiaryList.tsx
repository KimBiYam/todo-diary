import { css } from '@emotion/react';
import { Diary } from '@generated/graphql';
import { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import { BREAK_POINTS } from '../../styles/breakPoints';
import dateUtil from '../../utils/dateUtil';
import DiaryEmptyError from './DiaryEmptyError';
import DiaryItem from './DiaryItem';
import DiaryItemSkeleton from './DiaryItemSkeleton';
import { InView } from 'react-intersection-observer';
import { NetworkStatus } from '@apollo/client';

export type DiaryListProps = {
  selectedDate: Date | undefined;
};

const DEFAULT_PAGE_LIMIT = 10;

const DiaryList = ({ selectedDate }: DiaryListProps) => {
  const history = useHistory();
  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [fullyLoaded, setFullyLoaded] = useState(false);

  const { data, networkStatus, fetchMore } = useDiariesQuery({
    offset: 0,
    limit,
    createdDate:
      selectedDate && dateUtil.getFormattedDate(selectedDate.toDateString()),
  });

  const isShowSkeleton = useMemo(
    () =>
      networkStatus === NetworkStatus.loading ||
      networkStatus === NetworkStatus.fetchMore,
    [networkStatus],
  );

  const handleDiaryItemClick = useCallback(
    (diary: Diary) => history.push(`/diary/${diary.id}`),
    [],
  );

  if (data?.findMyDiaries.length === 0) {
    return <DiaryEmptyError />;
  }

  return (
    <div css={diarySection}>
      {data?.findMyDiaries.map((diary) => (
        <DiaryItem
          key={diary.id}
          diary={diary}
          onClick={handleDiaryItemClick}
        />
      ))}
      {isShowSkeleton &&
        Array.from({ length: DEFAULT_PAGE_LIMIT }).map((_, index) => (
          <DiaryItemSkeleton key={index} />
        ))}
      {networkStatus !== NetworkStatus.fetchMore && data && !fullyLoaded && (
        <InView
          onChange={async (inView) => {
            if (
              inView &&
              data.findMyDiaries.length % DEFAULT_PAGE_LIMIT === 0
            ) {
              const result = await fetchMore({
                variables: {
                  offset: data.findMyDiaries.length,
                },
              });
              setLimit((prev) => prev + result.data.findMyDiaries.length);
              setFullyLoaded(!result.data.findMyDiaries.length);
            }
          }}
        />
      )}
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
