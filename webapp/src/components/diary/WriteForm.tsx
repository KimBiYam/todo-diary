import { css } from '@emotion/react';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { COLORS } from '../../constants';
import useWriteDiaryMutation from '../../hooks/query/useWriteDiaryMutation';
import useDialog from '../../hooks/useDialog';
import useInput from '../../hooks/useInput';
import MainButton from '../common/MainButton';

export type WriteFormProps = {};

const WriteForm = memo(() => {
  const [title, onChangeTitle] = useInput();
  const [content, onChangeContent] = useInput();
  const { openDialog } = useDialog();
  const history = useHistory();

  const { mutate } = useWriteDiaryMutation(title, content, {
    onSuccess: () => history.push('/'),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      mutate();
    }
  };

  const validateForm = () => {
    if (!title || !content) {
      openDialog('글을 입력하세요');
      return false;
    }

    return true;
  };

  return (
    <div css={box}>
      <form css={form} onSubmit={handleSubmit}>
        <input
          name="title"
          value={title}
          onChange={onChangeTitle}
          css={titleInput}
          placeholder="제목을 입력하세요"
        />
        <textarea
          name="content"
          value={content}
          onChange={onChangeContent}
          css={contentSection}
          placeholder="내용을 입력하세요"
        />
        <MainButton type="submit" label="저장" />
      </form>
    </div>
  );
});

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

const titleInput = css`
  background-color: ${COLORS.pageBase};
  width: 100%;
  height: 3rem;
  font-size: 2rem;
  border: none;
`;

const contentSection = css`
  background-color: ${COLORS.pageBase};
  width: 100%;
  height: 20rem;
  resize: none;
  border: none;
  font-size: 1.5rem;
`;

export default WriteForm;
