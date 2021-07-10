import { css } from '@emotion/react';
import { Diary } from '../../types/diary.types';

export type DiaryItemProps = {
  diary: Diary;
};

const DiaryItem = ({ diary }: DiaryItemProps) => {
  const { title, content, createdAt, isFinished } = diary;

  return (
    <div css={block}>
      <h2 css={titleText}>제목 : {title}</h2>
      <p>작성일 : {createdAt}</p>
      <p>완료 여부 : {isFinished.toString()}</p>
      <div css={contentSection}>
        <p>{content}</p>
      </div>
    </div>
  );
};

const block = css`
  padding: 1rem;
  width: 24rem;
  height: 16rem;
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
`;

export default DiaryItem;
