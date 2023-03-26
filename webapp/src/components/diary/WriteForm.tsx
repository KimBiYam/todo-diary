import { ApolloError } from '@apollo/client';
import { css } from '@emotion/react';
import { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useWriteDiaryMutation from '../../hooks/mutation/useWriteDiaryMutation';
import useDialogAction from '../../hooks/useDialogAction';
import useInput from '../../hooks/useInput';
import LoadingPage from '../../pages/LoadingPage';
import MainButton from '../common/MainButton';
import DiaryCard from './DiaryCard';

const WriteForm = memo(() => {
  const [title, , handleTitleChange] = useInput();
  const [content, , handleContentChange] = useInput();

  const { openDialog } = useDialogAction();
  const history = useHistory();

  const handleWriteDiarySuccess = () => {
    history.push('/');
  };

  const handleWriteDiaryError = (e: ApolloError) => {
    openDialog(e.message);
  };

  const [mutate, { loading }] = useWriteDiaryMutation(
    { createDiaryDto: { content, title } },
    {
      onCompleted: handleWriteDiarySuccess,
      onError: handleWriteDiaryError,
    },
  );

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

  const renderButtons = useCallback(
    () => <MainButton type="submit" label="저장" />,
    [],
  );

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <form css={box} onSubmit={handleSubmit}>
      <DiaryCard
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
        renderButtons={renderButtons}
      />
    </form>
  );
});

const box = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default WriteForm;
