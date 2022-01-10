import { css } from '@emotion/react';
import { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import DatePicker from '../components/common/DatePicker';
import DiaryList from '../components/diary/DiaryList';
import { COLORS } from '../styles';
import useDatesTheDiaryExistsQuery from '../hooks/query/useDatesTheDiaryExistsQuery';
import { DatesTheDiaryExistsQueryParams } from '../types/diary.types';

const DiaryPage = () => {
  const currentDate = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [yearMonth, setYearMonth] = useState<DatesTheDiaryExistsQueryParams>({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  });

  const { data: existsDates } = useDatesTheDiaryExistsQuery(yearMonth);

  const handleMonthChange = useCallback(
    (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      setYearMonth({ year, month });
    },
    [setYearMonth],
  );

  const handleDateChange = useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [setSelectedDate],
  );

  const handleDateResetClick = useCallback(() => {
    setSelectedDate(undefined);
  }, [setSelectedDate]);

  return (
    <>
      <Helmet>
        <title>Todo Diary | Recent</title>
      </Helmet>
      <div css={box}>
        <div css={dateSection}>
          <DatePicker
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onMonthChange={handleMonthChange}
            existsDates={existsDates}
          />
          {selectedDate && (
            <button css={dateResetButton} onClick={handleDateResetClick}>
              날짜 초기화
            </button>
          )}
        </div>
        <DiaryList selectedDate={selectedDate} />
      </div>
    </>
  );
};

const box = css`
  padding: 2rem;
`;

const dateSection = css`
  display: flex;
`;

const dateResetButton = css`
  background: none;
  border: none;
  font-size: 1.6rem;
  color: ${COLORS.quaternary};
  cursor: pointer;
`;

export default DiaryPage;
