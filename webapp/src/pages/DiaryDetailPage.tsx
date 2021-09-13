import { css } from '@emotion/react';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams } from 'react-router';
import MainButton from '../components/common/MainButton';
import DiaryCard from '../components/diary/DiaryCard';
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

  const { mutate, isLoading: isUpdateDiaryLoading } = useUpdateDiaryMutation({
    onSuccess: () => refetch(),
  });

  const handleFinishedButtonClick = () => {
    if (diary) {
      mutate({ id: diary.id, isFinished: !diary.isFinished });
    }
  };

  const handleModifyButtonClick = () => {
    if (diary) {
      mutate({ id: diary.id, content: content, title: title });
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
        <MainButton
          label="수정"
          color="quaternary"
          onClick={handleModifyButtonClick}
        />
      </>
    );

  if (isFetching || isUpdateDiaryLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>Todo Diary | Diary Detail</title>
      </Helmet>
      {diary && (
        <div css={box}>
          <DiaryCard
            diary={diary}
            infoTexts={infoTexts}
            onChangeTitle={handleChangeTitle}
            onChangeContent={handleChangeContent}
            renderButtons={renderButtons}
          />
        </div>
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
