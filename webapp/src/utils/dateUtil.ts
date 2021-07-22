import { format } from 'date-fns';

const getFormattedDate = (date: string) => {
  const formattedDate = format(new Date(date), 'yyyy-MM-dd');

  return formattedDate;
};

const dateUtil = { getFormattedDate };

export default dateUtil;
