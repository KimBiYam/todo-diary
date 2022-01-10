import { css } from '@emotion/react';
import { memo, useMemo } from 'react';
import { COLORS } from '../../styles';
import { BREAK_POINTS } from '../../styles/breakPoints';
import { Diary } from '../../types/diary.types';
import dateUtil from '../../utils/dateUtil';

const TITLE_MAXIMUM_LENGTH = 20;
const CONTENT_MAXIMUM_LENGTH = 200;

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

  const slicedTitle = useMemo(
    () => title.slice(0, TITLE_MAXIMUM_LENGTH),
    [title],
  );

  const slicedContent = useMemo(
    () => content.slice(0, CONTENT_MAXIMUM_LENGTH),
    [content],
  );

  return (
    <div css={block(isFinished)} onClick={() => onClick(diary)}>
      <div css={titleSection}>
        <h2 css={titleText}>{slicedTitle}</h2>
        <div css={infoSection}>
          <span>{dateUtil.getFormattedDate(createdAt)}</span>
          <span>{finishedText}</span>
        </div>
      </div>
      <div css={contentSection}>
        <p>{slicedContent}</p>
      </div>
    </div>
  );
};

const block = (isFinished: boolean) => css`
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

  ${isFinished &&
  css`
    opacity: 0.3;
  `}
`;

const titleSection = css`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const titleText = css`
  flex: 2;
  width: 100%;
  height: 100%;
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
