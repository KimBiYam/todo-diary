import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { DiariesStatisticsResponse } from '../../types/diary.types';

const useDiariesStatisticsQuery = (
  startDate: string,
  endDate: string,
  options?: UseQueryOptions<DiariesStatisticsResponse, AxiosError>,
) =>
  useQuery(
    createKey(startDate, endDate),
    () => diaryApi.getDiariesStatistics(startDate, endDate),
    options,
  );

const createKey = (startDate: string, endDate: string) => [
  'diariesStatistics',
  startDate,
  endDate,
];

export default useDiariesStatisticsQuery;
