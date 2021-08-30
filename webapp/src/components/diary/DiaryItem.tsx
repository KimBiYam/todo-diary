import { css } from '@emotion/react';
import { memo } from 'react';
import { COLORS } from '../../constants';
import useTextSliceToBytes from '../../hooks/useTextSliceToBytes';
import { Diary } from '../../types/diary.types';
import dateUtil from '../../utils/dateUtil';

export type DiaryItemProps = {
  diary: Diary;
  onClick: (diary: Diary) => void;
};

const MAX_TITLE_BYTES = 16;
const MAX_CONTENT_BYTES = 196;

const DiaryItem = ({ diary, onClick }: DiaryItemProps) => {
  const { title, content, createdAt, isFinished } = diary;

  const slicedTitle = useTextSliceToBytes(title, MAX_TITLE_BYTES);
  const slicedContent = useTextSliceToBytes(content, MAX_CONTENT_BYTES);

  return (
    <div css={block} onClick={() => onClick(diary)}>
      <div css={titleSection}>
        <h2 css={titleText}>{slicedTitle}</h2>
        <div css={descriptionSection}>
          <span>{dateUtil.getFormattedDate(createdAt)}</span>
          <span>{isFinished.toString()}</span>
        </div>
      </div>
      <div css={contentSection}>
        <p>{slicedContent}</p>
      </div>
    </div>
  );
};

const block = css`
  padding: 1rem;
  height: 12rem;
  margin: 1rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 8px 16px 0px;
  transition: transform 0.2s ease-in-out;
  :hover {
    transform: translateY(-8px);
  }
`;

const titleSection = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const titleText = css`
  font-size: 3rem;
  font-weight: 500;
`;
const descriptionSection = css`
  font-size: 1.6rem;
  color: ${COLORS.tertiary};
`;

const contentSection = css`
  margin-top: 1.6rem;
  line-height: 1.5rem;
  font-size: 1.6rem;
  height: 5rem;
  color: ${COLORS.tertiary};
`;

export default memo(DiaryItem);
