import { css } from '@emotion/react';
import { BREAK_POINTS } from '../../styles/breakPoints';
import { Diary } from '../../types/diary.types';

export type DiaryCardProps = {
  diary?: Diary;
  mode: 'view' | 'write';
  onChangeTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  renderButtons?: () => React.ReactNode;
};

const DiaryCard = ({
  diary,
  mode,
  onChangeContent,
  onChangeTitle,
  renderButtons,
}: DiaryCardProps) => {
  return (
    <div css={box}>
      <input
        name="title"
        onChange={onChangeTitle}
        css={titleInput}
        placeholder="제목"
        defaultValue={diary?.title}
        maxLength={100}
        readOnly={mode === 'view'}
      />
      <textarea
        name="content"
        onChange={onChangeContent}
        css={contentWrapper}
        placeholder="내용을 입력하세요"
        defaultValue={diary?.content}
        maxLength={5000}
        readOnly={mode === 'view'}
      />
      {renderButtons && <div css={buttonWrapper}>{renderButtons()}</div>}
    </div>
  );
};

const box = css`
  width: 75%;
  height: 75%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 4px 4px;

  ${BREAK_POINTS.large} {
    width: 50%;
  }
`;

const titleInput = css`
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 5rem;
  font-size: 2rem;
  font-weight: 500;
  border: none;
`;

const contentWrapper = css`
  flex: 1;
  width: 100%;
  resize: none;
  border: none;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const buttonWrapper = css`
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
`;

export default DiaryCard;
