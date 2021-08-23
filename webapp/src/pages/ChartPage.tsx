import { css } from '@emotion/react';
import { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DiaryChart from '../components/diary/DiaryChart';
import YearPicker from '../components/diary/YearPicker';
import { COLORS } from '../constants';
import useDiariesStatisticsQuery from '../hooks/query/useDiariesStatisticsQuery';

export type ChartPageProps = {};

const ChartPage = () => {
  const minYear = useMemo(() => 2010, []);
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [year, setYear] = useState(currentYear);

  const handleChangeYear = useCallback(
    (year: number) => {
      setYear(year);
    },
    [setYear],
  );

  const { data: diariesStatistics } = useDiariesStatisticsQuery(year);

  return (
    <>
      <Helmet>
        <title>Todo Diary | Chart</title>
      </Helmet>
      <div css={box}>
        <div css={yearPickerSection}>
          <p css={description}>연도를 클릭하여 변경이 가능합니다</p>
          <div>
            <YearPicker
              onChange={handleChangeYear}
              minYear={minYear}
              maxYear={currentYear}
            />
            <span>년의 통계에요!</span>
          </div>
        </div>
        <div css={chartSection}>
          {diariesStatistics && (
            <DiaryChart diariesStatistics={diariesStatistics} />
          )}
        </div>
      </div>
    </>
  );
};

const box = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const description = css`
  font-size: 1.6rem;
  color: ${COLORS.secondary};
  margin-bottom: 2rem;
`;

const yearPickerSection = css`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6rem;
  color: ${COLORS.secondary};
`;

const chartSection = css`
  width: 50rem;
  height: 30rem;
`;

export default ChartPage;
