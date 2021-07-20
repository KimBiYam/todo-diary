import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { Diary } from '../../types/diary.types';

const useDiariesQuery = (
  page: number,
  limit: number,
  options: UseQueryOptions<Diary[], AxiosError> = {},
) => {
  return useQuery('diaries', () => diaryApi.getDiaries(page, limit), {
    ...options,
  });
};

export default useDiariesQuery;
