import { css } from '@emotion/react';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import MainButton from '../components/common/MainButton';
import DiaryCard from '../components/diary/DiaryCard';
import useDeleteDiaryMutation from '../hooks/mutation/useDeleteDiaryMutation';
import useUpdateDiaryMutation from '../hooks/mutation/useUpdateDiaryMutation';
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
    onSuccess: handleDiaryQuerySuccess,
    onError: handleDiaryQueryError,
  });

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

  const invalidateDiaryQuries = () => {
    if (diary) {
      const createdYear = new Date(diary?.createdAt).getFullYear();

      queryClient.invalidateQueries(useDiariesQuery.createKey());
      queryClient.invalidateQueries(
        useDiariesStatisticsQuery.createKey(createdYear),
      );
    }
  };

  const handleUpdateDiaryMutateSuccess = () => {
    refetch();
    invalidateDiaryQuries();
  };

  const handleDeleteDiaryMutateSuccess = () => {
    invalidateDiaryQuries();
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
