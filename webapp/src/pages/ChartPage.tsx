import { Helmet } from 'react-helmet-async';
import DiaryChart from '../components/diary/DiaryChart';

export type ChartPageProps = {};

const ChartPage = () => {
  return (
    <>
      <Helmet>
        <title>Todo Diary | Chart</title>
      </Helmet>
      <DiaryChart />
    </>
  );
};

export default ChartPage;
