import useDiariesAchievementRateQuery from '../../hooks/query/useDiariesAchievementRateQuery';
import useDiariesStatisticsQuery from '../../hooks/query/useDiariesStatisticsQuery';
import useUserSelector from '../../hooks/useUserSelector';

export type DiaryChartProps = {};

const DiaryChart = () => {
  // temporary data
  const { user } = useUserSelector();

  const startDate = '2021-08-01';
  const endDate = '2021-08-31';

  const { data: achievementRate } = useDiariesAchievementRateQuery(user);
  const { data: diariesStatistics } = useDiariesStatisticsQuery(
    startDate,
    endDate,
  );

  console.log(achievementRate);
  console.log(diariesStatistics);

  return <div></div>;
};

export default DiaryChart;
