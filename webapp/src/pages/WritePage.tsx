import { Helmet } from 'react-helmet-async';
import WriteForm from '../components/diary/WriteForm';

export type WritePageProps = {};

const WritePage = () => {
  return (
    <>
      <Helmet>
        <title>Todo Diary | Write</title>
      </Helmet>
      <WriteForm />
    </>
  );
};

export default WritePage;
