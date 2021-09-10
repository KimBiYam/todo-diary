import { Helmet } from 'react-helmet-async';
import DiaryList from '../components/diary/DiaryList';

export type DiaryPageProps = {};

const DiaryPage = () => {
  return (
    <>
      <Helmet>
        <title>Todo Diary | Recent</title>
      </Helmet>
      <DiaryList />
    </>
  );
};

export default DiaryPage;
