import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { Diary } from '../../types/diary.types';

type DiaresQueryParams = {
  limit: number;
  createdDate?: string;
};

const useDiariesQuery = (
  { limit, createdDate }: DiaresQueryParams,
  options: UseInfiniteQueryOptions<Diary[], string> = {},
) =>
  useInfiniteQuery(
    createKey(createdDate),
    ({ pageParam = 1 }) => diaryApi.getDiaries(pageParam, limit, createdDate),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === limit ? allPages.length + 1 : undefined;
      },
      ...options,
    },
  );

const createKey = (createdDate?: string) => ['diaries', createdDate];

useDiariesQuery.createKey = createKey;

export default useDiariesQuery;
