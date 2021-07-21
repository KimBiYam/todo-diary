import { css } from '@emotion/react';
import { memo } from 'react';
import useTextSliceToBytes from '../../hooks/useTextSliceToBytes';
import { Diary } from '../../types/diary.types';

export type DiaryItemProps = {
  diary: Diary;
};

const MAX_TITLE_BYTES = 22;
const MAX_CONTENT_BYTES = 196;

const DiaryItem = memo(({ diary }: DiaryItemProps) => {
  const { title, content, createdAt, isFinished } = diary;

  const slicedTitle = useTextSliceToBytes(title, MAX_TITLE_BYTES);
  const slicedContent = useTextSliceToBytes(content, MAX_CONTENT_BYTES);

  return (
    <div css={block}>
      <h2 css={titleText}>{slicedTitle}</h2>
      <div css={descriptionSection}>
        <p>작성일 : {createdAt}</p>
        <p>완료 여부 : {isFinished.toString()}</p>
      </div>
      <div css={contentSection}>
        <p>{slicedContent}</p>
      </div>
    </div>
  );
});

const block = css`
  padding: 1rem;
  width: 24rem;
  height: 13rem;
  margin: 1rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 8px 16px 0px;
  transition: transform 200ms ease-in-out;
  :hover {
    transform: translateY(-8px);
  }
`;

const titleText = css`
  font-size: 2rem;
  font-weight: 500;
`;

const descriptionSection = css`
  margin-top: 1rem;
`;

const contentSection = css`
  margin-top: 1rem;
  line-height: 1.5rem;
  height: 5rem;
`;

export default DiaryItem;
