import { Helmet } from 'react-helmet-async';

export type NotFoundPageProps = {};

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Todo Diary | Not Found</title>
      </Helmet>
      <div>NotFound!</div>
    </>
  );
};

export default NotFoundPage;
