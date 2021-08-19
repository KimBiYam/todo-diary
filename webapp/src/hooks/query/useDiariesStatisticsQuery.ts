import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { DiariesStatistics } from '../../types/diary.types';

const useDiariesStatisticsQuery = (
  year: number,
  options?: UseQueryOptions<DiariesStatistics[], AxiosError>,
) =>
  useQuery(
    createKey(year),
    () => diaryApi.getDiariesStatisticsByYear(year),
    options,
  );

const createKey = (year: number) => ['diariesStatistics', year];

export default useDiariesStatisticsQuery;
