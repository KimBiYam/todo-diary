import { css } from '@emotion/react';
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
    <LineChart
      width={width}
      height={height}
      data={diariesStatistics}
      css={chart}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" fontStyle={1.6} />
      <YAxis width={15} />
      <Tooltip
        labelFormatter={(label) => `${label}월`}
        labelStyle={{ fontSize: '1.4rem' }}
        contentStyle={{ fontSize: '1.4rem' }}
      />
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

const chart = css`
  .recharts-cartesian-axis-tick-value {
    font-size: 1.2rem;
  }

  .recharts-legend-item {
    font-size: 1.4rem;
  }
`;

export default DiaryChart;
