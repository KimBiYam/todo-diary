import { css } from '@emotion/react';
import { memo, useMemo } from 'react';
import { COLORS } from '../../constants';
import { BREAK_POINTS } from '../../styles/breakPoints';
import { Diary } from '../../types/diary.types';
import dateUtil from '../../utils/dateUtil';

export type DiaryItemProps = {
  diary: Diary;
  onClick: (diary: Diary) => void;
};

const DiaryItem = ({ diary, onClick }: DiaryItemProps) => {
  const { title, content, createdAt, isFinished } = diary;

  const finishedText = useMemo(
    () => (isFinished ? '완료' : '미완료'),
    [isFinished],
  );

  return (
    <div css={block} onClick={() => onClick(diary)}>
      <div css={titleSection}>
        <h2 css={titleText}>{title}</h2>
        <div css={infoSection}>
          <span>{dateUtil.getFormattedDate(createdAt)}</span>
          <span>{finishedText}</span>
        </div>
      </div>
      <div css={contentSection}>
        <p>{content}</p>
      </div>
    </div>
  );
};

const block = css`
  height: 12rem;
  padding: 1rem;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const titleText = css`
  flex: 2;
  width: 100%;
  font-size: 2rem;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${BREAK_POINTS.medium} {
    font-size: 2.5rem;
  }

  ${BREAK_POINTS.large} {
    font-size: 3rem;
  }
`;

const infoSection = css`
  flex: 1.5;
  color: ${COLORS.tertiary};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  ${BREAK_POINTS.medium} {
    font-size: 1.6rem;
  }

  ${BREAK_POINTS.large} {
    font-size: 1.6rem;
  }
`;

const contentSection = css`
  margin-top: 1.6rem;
  line-height: 2rem;
  font-size: 1.6rem;
  color: ${COLORS.tertiary};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

export default memo(DiaryItem);
