import { css } from '@emotion/react';
import { useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams } from 'react-router';
import MainButton from '../components/common/MainButton';
import DiaryCard from '../components/diary/DiaryCard';
import useUpdateDiaryMutation from '../hooks/mutation/useUpdateDiaryMutation';
import useDiaryQuery from '../hooks/query/useDiaryQuery';
import useDialogAction from '../hooks/useDialogAction';
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

  const renderButtons = useCallback(
    () =>
      diary && (
        <MainButton
          label={diary.isFinished ? '미완료' : '완료'}
          color="primary"
          onClick={() =>
            mutate({ id: diary.id, isFinished: !diary.isFinished })
          }
        />
      ),
    [diary],
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
            mode="view"
            diary={diary}
            infoTexts={infoTexts}
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
