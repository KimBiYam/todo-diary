import useDiariesStatisticsQuery from '../../hooks/query/useDiariesStatisticsQuery';

export type DiaryChartProps = {};

const DiaryChart = () => {
  // temporary data
  const startDate = '2021-08-01';
  const endDate = '2021-08-31';

  const { data } = useDiariesStatisticsQuery(startDate, endDate);

  console.log(data);

  return <div></div>;
};

export default DiaryChart;
