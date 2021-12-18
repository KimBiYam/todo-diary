import { useQuery, UseQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { DatesTheDiaryExistsQueryParams } from '../../types/diary.types';

const useDatesTheDiaryExistsQuery = (
  { year, month }: DatesTheDiaryExistsQueryParams,
  options?: UseQueryOptions<number[], string>,
) =>
  useQuery(
    createKey(year, month),
    () => diaryApi.getDatesTheDiaryExists(year, month),
    options,
  );

const defaultKey = 'datesTheDiaryExists';
const createKey = (year: number, month: number) => [defaultKey, year, month];

useDatesTheDiaryExistsQuery.defaultKey = defaultKey;
useDatesTheDiaryExistsQuery.createKey = createKey;

export default useDatesTheDiaryExistsQuery;
