import { ApolloError, gql, useMutation } from '@apollo/client';
import { css } from '@emotion/react';
import { Diary, MutationUpdateMyDiaryArgs } from '@generated/graphql';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams } from 'react-router';
import MainButton from '../components/common/MainButton';
import DiaryCard from '../components/diary/DiaryCard';
import useDeleteDiaryMutation from '../hooks/mutation/useDeleteDiaryMutation';
import useDiaryQuery from '../hooks/query/useDiaryQuery';
import useDialogAction from '../hooks/useDialogAction';
import useInput from '../hooks/useInput';
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

  useEffect(() => {
    if (id === undefined) {
      history.push('/');
    }
  }, []);

  const handleDiaryQuerySuccess = (data: { findMyDiary: Diary }) => {
    setTitle(data.findMyDiary.title);
    setContent(data.findMyDiary.diaryMeta.content);
  };

  const handleDiaryQueryError = (e: ApolloError) => {
    openDialog(e.message);
    history.push('/');
  };

  const { data, loading } = useDiaryQuery(
    { id: Number(id) },
    {
      skip: Number.isNaN(Number(id)),
      onCompleted: handleDiaryQuerySuccess,
      onError: handleDiaryQueryError,
    },
  );

  const finishedText = useMemo(
    () => (data?.findMyDiary.isFinished ? '완료' : '미완료'),
    [data?.findMyDiary.isFinished],
  );

  const infoTexts = useMemo(
    () =>
      data?.findMyDiary && [
        `작성일 : ${dateUtil.getFormattedDate(data.findMyDiary?.createdAt)}`,
        `완료 여부 : ${finishedText}`,
      ],
    [data?.findMyDiary],
  );

  const handleMutateError = (e: ApolloError) => {
    openDialog(e.message);
  };

  const handleDeleteDiaryMutateSuccess = () => {
    history.push('/');
  };

  const [updateDiary, { loading: isUpdateDiaryLoading }] = useMutation<
    { updateMyDiary: Diary },
    MutationUpdateMyDiaryArgs
  >(
    gql`
      mutation UpdateMyDiary($updateDiaryDto: UpdateDiaryDto!, $id: Int!) {
        updateMyDiary(updateDiaryDto: $updateDiaryDto, id: $id) {
          title
          diaryMeta {
            content
          }
        }
      }
    `,
    {
      variables: {
        id: Number(data?.findMyDiary.id),
        updateDiaryDto: { content, title },
      },
    },
  );

  const [changeDiaryFinished, { loading: isChangeDiaryFinishedLoading }] =
    useMutation<Diary, MutationUpdateMyDiaryArgs>(
      gql`
        mutation ChangeDiaryFinished(
          $updateDiaryDto: UpdateDiaryDto!
          $id: Int!
        ) {
          updateMyDiary(updateDiaryDto: $updateDiaryDto, id: $id) {
            isFinished
          }
        }
      `,
      {
        variables: {
          id: Number(data?.findMyDiary.id),
          updateDiaryDto: { isFinished: !data?.findMyDiary.isFinished },
        },
        refetchQueries: [],
      },
    );

  const [deleteDiary, { loading: isDeleteDiaryLoading }] =
    useDeleteDiaryMutation(
      {
        id: Number(data?.findMyDiary.id),
      },
      {
        onCompleted: handleDeleteDiaryMutateSuccess,
        onError: handleMutateError,
      },
    );

  const handleFinishedButtonClick = () => {
    if (data?.findMyDiary) {
      changeDiaryFinished();
    }
  };

  const validateForm = () => {
    if (!title || !content) {
      openDialog('글을 입력하세요');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm() && data?.findMyDiary) {
      updateDiary();
    }
  };

  const handleDeleteClick = () => {
    if (data?.findMyDiary) {
      deleteDiary();
    }
  };

  const renderButtons = () =>
    data?.findMyDiary && (
      <>
        <MainButton
          label={data.findMyDiary.isFinished ? '미완료' : '완료'}
          color="primary"
          onClick={handleFinishedButtonClick}
        />
        <MainButton label="삭제" color="red" onClick={handleDeleteClick} />
        <MainButton label="수정" color="quaternary" type="submit" />
      </>
    );

  if (
    loading ||
    isUpdateDiaryLoading ||
    isDeleteDiaryLoading ||
    isChangeDiaryFinishedLoading
  ) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>Todo Diary | Diary Detail</title>
      </Helmet>
      {data?.findMyDiary && (
        <form css={box} onSubmit={handleSubmit}>
          <DiaryCard
            diary={data.findMyDiary}
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
