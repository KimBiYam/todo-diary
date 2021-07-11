import { css } from '@emotion/react';
import useDiariesQuery from '../../hooks/query/useDiariesQuery';
import DiaryItem from './DiaryItem';
import DiaryItemSkeleton from './DiaryItemSkeleton';

export type DiaryListProps = {};

const DiaryList = () => {
  const { data: diaries } = useDiariesQuery({
    refetchOnWindowFocus: false,
  });

  return (
    <div css={block}>
      <div css={diariesSection}>
        {diaries !== undefined
          ? diaries.map((diary) => <DiaryItem key={diary.id} diary={diary} />)
          : Array.from({ length: 10 }).map((_, index) => (
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
