import { css } from '@emotion/react';
import { COLORS } from '../../constants';
import MainButton from '../common/MainButton';

export type WriteFormProps = {};

const WriteForm = () => {
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div css={box}>
      <form css={form} onSubmit={handleOnSubmit}>
        <input name="title" css={title} placeholder="제목을 입력하세요" />
        <textarea
          name="content"
          css={content}
          placeholder="내용을 입력하세요"
        />
        <MainButton type="submit" label="저장" />
      </form>
    </div>
  );
};

const box = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const form = css`
  width: 80%;
`;

const title = css`
  background-color: ${COLORS.pageBase};
  width: 100%;
  height: 3rem;
  font-size: 2rem;
  border: none;
`;

const content = css`
  background-color: ${COLORS.pageBase};
  width: 100%;
  height: 20rem;
  resize: none;
  border: none;
  font-size: 1.5rem;
`;

export default WriteForm;
