import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams } from 'react-router';
import useDiaryQuery from '../hooks/query/useDiaryQuery';
import LoadingPage from './LoadingPage';

export type DiaryDetailPageProps = {};

type DiaryDetailParams = { id?: string };

const DiaryDetailPage = () => {
  const history = useHistory();
  const { id } = useParams<DiaryDetailParams>();

  useEffect(() => {
    if (id === undefined) {
      history.push('/');
    }
  }, []);

  const { isLoading } = useDiaryQuery(id ?? '', {
    enabled: id !== undefined,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>Todo Diary | Diary Detail</title>
      </Helmet>
    </>
  );
};

export default DiaryDetailPage;
