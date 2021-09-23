import { css } from '@emotion/react';
import { useCallback } from 'react';
import Picker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import { COLORS } from '../../constants';
import Icon from './Icon';

import ko from 'date-fns/locale/ko';
registerLocale('ko', ko);

export type DatePickerProps = {
  selectedDate: Date | undefined;
  onDateChange: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  existsDates: number[] | undefined;
};

const DatePicker = ({
  selectedDate,
  onDateChange,
  onMonthChange,
  existsDates,
}: DatePickerProps) => {
  const filterDate = useCallback(
    (date: Date) => existsDates?.includes(date.getDate()) ?? false,
    [existsDates],
  );

  const renderCustomInput = useCallback(() => {
    return (
      <button css={button}>
        <Icon css={calendarIcon} icon="calendar" />
      </button>
    );
  }, []);

  return (
    <Picker
      selected={selectedDate}
      onChange={onDateChange}
      onMonthChange={onMonthChange}
      filterDate={filterDate}
      locale="ko"
      customInput={renderCustomInput()}
      withPortal
    />
  );
};

const button = css`
  margin: 1rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const calendarIcon = css`
  fill: ${COLORS.quaternary};
`;

export default DatePicker;
