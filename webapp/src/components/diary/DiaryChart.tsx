import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { COLORS } from '../../constants';
import { DiariesStatistics } from '../../types/diary.types';

export type DiaryChartProps = {
  diariesStatistics: DiariesStatistics[];
};

const DiaryChart = ({ diariesStatistics }: DiaryChartProps) => {
  return (
    <LineChart
      width={500}
      height={300}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      data={diariesStatistics}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="totalCount"
        stroke={COLORS.tertiary}
        name="전체 글"
      />
      <Line
        type="monotone"
        dataKey="finishedDiariesCount"
        stroke={COLORS.quaternary}
        name="완료 수"
      />
    </LineChart>
  );
};

export default DiaryChart;
