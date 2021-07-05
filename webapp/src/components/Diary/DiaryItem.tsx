import { css } from '@emotion/react';
import { Diary } from '../../types/diary.types';

export type DiaryItemProps = {
  diary: Diary;
};

const DiaryItem = ({ diary }: DiaryItemProps) => {
  const { title } = diary;

  return (
    <div css={block}>
      <p>title : {title}</p>
    </div>
  );
};

const block = css`
  width: 24rem;
  height: 16rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 8px 16px 0px;
  transition: transform 200ms ease-in-out;
  :hover {
    transform: translateY(-8px);
  }
`;

export default DiaryItem;
