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
  width: number;
  height: number;
};

const DiaryChart = ({ diariesStatistics, width, height }: DiaryChartProps) => {
  return (
    <LineChart width={width} height={height} data={diariesStatistics}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis width={15} />
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
