import { css } from '@emotion/react';
import { Diary } from '@generated/graphql';
import { COLORS } from '../../styles';
import { BREAK_POINTS } from '../../styles/breakPoints';

export type DiaryCardProps = {
  diary?: Diary;
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  renderButtons?: () => React.ReactNode;
  infoTexts?: string[];
};

const DiaryCard = ({
  diary,
  onContentChange,
  onTitleChange,
  renderButtons,
  infoTexts,
}: DiaryCardProps) => {
  return (
    <div css={box}>
      <input
        name="title"
        onChange={onTitleChange}
        css={titleInput}
        placeholder="제목"
        defaultValue={diary?.title}
        maxLength={100}
      />
      {infoTexts && (
        <div css={infoWrapper}>
          {infoTexts.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      )}
      <textarea
        name="content"
        onChange={onContentChange}
        css={contentWrapper}
        placeholder="내용을 입력하세요"
        defaultValue={diary?.diaryMeta.content}
        maxLength={5000}
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

const infoWrapper = css`
  margin: 0.8rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.4rem;
  color: ${COLORS.secondary};
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
