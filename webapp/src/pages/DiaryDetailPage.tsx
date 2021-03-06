import { css } from '@emotion/react';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import HttpError from '../api/models/httpError';
import MainButton from '../components/common/MainButton';
import DiaryCard from '../components/diary/DiaryCard';
import useDeleteDiaryMutation from '../hooks/mutation/useDeleteDiaryMutation';
import useUpdateDiaryMutation from '../hooks/mutation/useUpdateDiaryMutation';
import useDatesTheDiaryExistsQuery from '../hooks/query/useDatesTheDiaryExistsQuery';
import useDiariesQuery from '../hooks/query/useDiariesQuery';
import useDiariesStatisticsQuery from '../hooks/query/useDiariesStatisticsQuery';
import useDiaryQuery from '../hooks/query/useDiaryQuery';
import useDialogAction from '../hooks/useDialogAction';
import useInput from '../hooks/useInput';
import { Diary } from '../types/diary.types';
import dateUtil from '../utils/dateUtil';
import LoadingPage from './LoadingPage';

export type DiaryDetailPageProps = {};

type DiaryDetailParams = { id?: string };

const DiaryDetailPage = () => {
  const [title, setTitle, handleTitleChange] = useInput();
  const [content, setContent, handleContentChange] = useInput();

  const { id } = useParams<DiaryDetailParams>();
  const { openDialog } = useDialogAction();
  const history = useHistory();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (id === undefined) {
      history.push('/');
    }
  }, []);

  const handleDiaryQuerySuccess = (diary: Diary) => {
    const { title, content } = diary;

    setTitle(title);
    setContent(content);
  };

  const handleDiaryQueryError = (e: HttpError) => {
    openDialog(e.message);
    history.push('/');
  };

  const {
    data: diary,
    isFetching,
    refetch,
  } = useDiaryQuery(id ?? '', {
    enabled: id !== undefined,
    onSuccess: handleDiaryQuerySuccess,
    onError: handleDiaryQueryError,
  });

  const finishedText = useMemo(
    () => (diary?.isFinished ? '??????' : '?????????'),
    [diary],
  );

  const infoTexts = useMemo(
    () =>
      diary && [
        `????????? : ${dateUtil.getFormattedDate(diary?.createdAt)}`,
        `?????? ?????? : ${finishedText}`,
      ],
    [diary],
  );

  const handleMutateError = (e: string) => {
    openDialog(e);
  };

  const invalidateDiaryQueries = () => {
    if (diary) {
      const createdYear = new Date(diary?.createdAt).getFullYear();

      queryClient.invalidateQueries(useDiariesQuery.defaultKey);
      queryClient.invalidateQueries(useDatesTheDiaryExistsQuery.defaultKey);
      queryClient.invalidateQueries(
        useDiariesStatisticsQuery.createKey(createdYear),
      );
    }
  };

  const handleUpdateDiaryMutateSuccess = () => {
    refetch();
    invalidateDiaryQueries();
  };

  const handleDeleteDiaryMutateSuccess = () => {
    invalidateDiaryQueries();
    history.push('/');
  };

  const { mutate: updateDiaryMutate, isLoading: isUpdateDiaryLoading } =
    useUpdateDiaryMutation({
      onSuccess: handleUpdateDiaryMutateSuccess,
      onError: handleMutateError,
    });

  const { mutate: deleteDiaryMutate, isLoading: isDeleteDiaryLoading } =
    useDeleteDiaryMutation({
      onSuccess: handleDeleteDiaryMutateSuccess,
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
      openDialog('?????? ???????????????');
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
          label={diary.isFinished ? '?????????' : '??????'}
          color="primary"
          onClick={handleFinishedButtonClick}
        />
        <MainButton label="??????" color="red" onClick={handleDeleteClick} />
        <MainButton label="??????" color="quaternary" type="submit" />
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
            onTitleChange={handleTitleChange}
            onContentChange={handleContentChange}
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
