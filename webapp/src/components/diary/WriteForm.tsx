import { css } from '@emotion/react';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import useWriteDiaryMutation from '../../hooks/mutation/useWriteDiaryMutation';
import useDiariesAchievementRateQuery from '../../hooks/query/useDiariesAchievementRateQuery';
import useDialogAction from '../../hooks/useDialogAction';
import useInput from '../../hooks/useInput';
import useUserSelector from '../../hooks/useUserSelector';
import MainButton from '../common/MainButton';

export type WriteFormProps = {};

const WriteForm = memo(() => {
  const [title, handleChangeTitle] = useInput();
  const [content, handleChangeContent] = useInput();
  const { openDialog } = useDialogAction();
  const history = useHistory();

  const { user } = useUserSelector();
  const { refetch } = useDiariesAchievementRateQuery(user, { enabled: false });

  const handleSuccessWriteDiray = () => {
    refetch();
    history.push('/');
  };

  const { mutate } = useWriteDiaryMutation({
    onSuccess: handleSuccessWriteDiray,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({ title, content });
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
          onChange={handleChangeTitle}
          css={titleInput}
          placeholder="제목"
        />
        <textarea
          name="content"
          value={content}
          onChange={handleChangeContent}
          css={contentSection}
          placeholder="내용을 입력하세요"
        />
        <MainButton type="submit" label="Save" />
      </form>
    </div>
  );
});

const box = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const form = css`
  width: 45%;
  height: 75%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 4px 4px;
`;

const titleInput = css`
  background-color: transparent;
  width: 100%;
  height: 3rem;
  font-size: 2rem;
  border: none;
`;

const contentSection = css`
  flex: 1;
  width: 100%;
  resize: none;
  border: none;
  font-size: 1.5rem;
`;

export default WriteForm;
