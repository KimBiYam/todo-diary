import { css } from '@emotion/react';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams } from 'react-router';
import DiaryCard from '../components/diary/DiaryCard';
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

  const { data: diary, isLoading } = useDiaryQuery(id ?? '', {
    enabled: id !== undefined,
    onError: handleDiaryQueryError,
  });

  const finishedText = useMemo(
    () => (diary?.isFinished ? '완료' : '미완료'),
    [diary],
  );

  if (isLoading) {
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
            infoTexts={[
              `작성일 : ${dateUtil.getFormattedDate(diary?.createdAt)}`,
              `완료 여부 : ${finishedText}`,
            ]}
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
