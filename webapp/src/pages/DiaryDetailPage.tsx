import { css } from '@emotion/react';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams } from 'react-router';
import MainButton from '../components/common/MainButton';
import DiaryCard from '../components/diary/DiaryCard';
import useDeleteDiaryMutation from '../hooks/mutation/useDeleteDiaryMutation';
import useUpdateDiaryMutation from '../hooks/mutation/useUpdateDiaryMutation';
import useDiaryQuery from '../hooks/query/useDiaryQuery';
import useDialogAction from '../hooks/useDialogAction';
import useInput from '../hooks/useInput';
import dateUtil from '../utils/dateUtil';
import LoadingPage from './LoadingPage';

export type DiaryDetailPageProps = {};

type DiaryDetailParams = { id?: string };

const DiaryDetailPage = () => {
  const history = useHistory();
  const { id } = useParams<DiaryDetailParams>();
  const { openDialog } = useDialogAction();

  useEffect(() => {
    if (id === undefined) {
      history.push('/');
    }
  }, []);

  const handleDiaryQueryError = (e: string) => {
    openDialog(e);
    history.push('/');
  };

  const {
    data: diary,
    isFetching,
    refetch,
  } = useDiaryQuery(id ?? '', {
    enabled: id !== undefined,
    onError: handleDiaryQueryError,
  });

  const [title, handleChangeTitle] = useInput(diary?.title);
  const [content, handleChangeContent] = useInput(diary?.content);

  const finishedText = useMemo(
    () => (diary?.isFinished ? '완료' : '미완료'),
    [diary],
  );

  const infoTexts = useMemo(
    () =>
      diary && [
        `작성일 : ${dateUtil.getFormattedDate(diary?.createdAt)}`,
        `완료 여부 : ${finishedText}`,
      ],
    [diary],
  );

  const handleMutateError = (e: string) => {
    openDialog(e);
  };

  const { mutate: updateDiaryMutate, isLoading: isUpdateDiaryLoading } =
    useUpdateDiaryMutation({
      onSuccess: () => refetch(),
      onError: handleMutateError,
    });

  const { mutate: deleteDiaryMutate, isLoading: isDeleteDiaryLoading } =
    useDeleteDiaryMutation({
      onSuccess: () => history.push('/'),
      onError: handleMutateError,
    });

  const handleFinishedButtonClick = () => {
    if (diary) {
      updateDiaryMutate({ id: diary.id, isFinished: !diary.isFinished });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && diary) {
      updateDiaryMutate({ id: diary.id, title, content });
    }
  };

  const validateForm = () => {
    if (!title || !content) {
      openDialog('글을 입력하세요');
      return false;
    }

    return true;
  };

  const handleDeleteClick = () => {
    if (diary) {
      deleteDiaryMutate(diary.id);
    }
  };

  const renderButtons = () =>
    diary && (
      <>
        <MainButton
          label={diary.isFinished ? '미완료' : '완료'}
          color="primary"
          onClick={handleFinishedButtonClick}
        />
        <MainButton label="삭제" color="red" onClick={handleDeleteClick} />
        <MainButton label="수정" color="quaternary" type="submit" />
      </>
    );

  if (isFetching || isUpdateDiaryLoading || isDeleteDiaryLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>Todo Diary | Diary Detail</title>
      </Helmet>
      {diary && (
        <form css={box} onSubmit={handleSubmit}>
          <DiaryCard
            diary={diary}
            infoTexts={infoTexts}
            onChangeTitle={handleChangeTitle}
            onChangeContent={handleChangeContent}
            renderButtons={renderButtons}
          />
        </form>
      )}
    </>
  );
};

const box = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default DiaryDetailPage;
