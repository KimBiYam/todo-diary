import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { Diary } from '../../types/diary.types';

const useDiariesQuery = (
  options: UseQueryOptions<Diary[], AxiosError> = {},
) => {
  return useQuery('diaries', diaryApi.getDiaries, { ...options });
};

export default useDiariesQuery;
