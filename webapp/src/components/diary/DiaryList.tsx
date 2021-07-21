import { css } from '@emotion/react';
import { useEffect, useMemo, useRef } from 'react';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
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

  useEffect(() => {
    if (!hasNextPage) {
      return;
    }
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      }),
    );

    const element = fetchMoreElementRef && fetchMoreElementRef.current;
    if (!element) {
      return;
    }

    observer.observe(element);

    return () => observer && observer.disconnect();
  }, [hasNextPage]);

  return (
    <>
      <div css={block}>
        <div css={diariesSection}>
          {data &&
            data.pages.map((diaries) =>
              diaries.map((diary, index) => (
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
