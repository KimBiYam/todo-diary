import { useState } from 'react';
import useDiariesStatisticsQuery from '../../hooks/query/useDiariesStatisticsQuery';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { css } from '@emotion/react';

export type DiaryChartProps = {};

const DiaryChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  const { data: diariesStatistics } = useDiariesStatisticsQuery(year);

  return (
    <div css={box}>
      {diariesStatistics && (
        <LineChart
          width={600}
          height={350}
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
            stroke="#8884d8"
            name="전체 글"
          />
          <Line
            type="monotone"
            dataKey="finishedDiariesCount"
            stroke="#82ca9d"
            name="완료 수"
          />
        </LineChart>
      )}
    </div>
  );
};

const box = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default DiaryChart;
