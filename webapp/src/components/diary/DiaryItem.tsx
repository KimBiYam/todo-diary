import { css } from '@emotion/react';
import { useMemo } from 'react';
import useTextSliceToBytes from '../../hooks/useTextSliceToBytes';
import { Diary } from '../../types/diary.types';

export type DiaryItemProps = {
  diary: Diary;
};

const DiaryItem = ({ diary }: DiaryItemProps) => {
  const { title, content, createdAt, isFinished } = diary;

  const maxTitleBytes = useMemo(() => 22, []);
  const maxContentBytes = useMemo(() => 98, []);

  const slicedTitle = useTextSliceToBytes(title, maxTitleBytes);
  const slicedContent = useTextSliceToBytes(content, maxContentBytes);

  return (
    <div css={block}>
      <h2 css={titleText}>{slicedTitle}</h2>
      <p>작성일 : {createdAt}</p>
      <p>완료 여부 : {isFinished.toString()}</p>
      <div css={contentSection}>
        <p>{slicedContent}</p>
      </div>
    </div>
  );
};

const block = css`
  padding: 1rem;
  width: 24rem;
  height: 10rem;
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

const contentSection = css`
  margin-top: 1rem;
  line-height: 1.5rem;
  height: 5rem;
`;

export default DiaryItem;
