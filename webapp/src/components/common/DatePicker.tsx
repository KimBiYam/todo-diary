import { useCallback } from 'react';
import Picker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export type DatePickerProps = {
  selectedDate: Date;
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
    (date: Date) => existsDates?.includes(date.getDate()) ?? true,
    [existsDates],
  );

  return (
    <Picker
      selected={selectedDate}
      onChange={onDateChange}
      onMonthChange={onMonthChange}
      filterDate={filterDate}
    />
  );
};

export default DatePicker;
