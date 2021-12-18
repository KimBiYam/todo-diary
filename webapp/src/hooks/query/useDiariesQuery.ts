import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { Diary } from '../../types/diary.types';

type DiariesQueryParams = {
  limit: number;
  createdDate?: string;
};

const useDiariesQuery = (
  { limit, createdDate }: DiariesQueryParams,
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

const defaultKey = 'diaries';
const createKey = (createdDate?: string) => [defaultKey, createdDate];

useDiariesQuery.defaultKey = defaultKey;
useDiariesQuery.createKey = createKey;

export default useDiariesQuery;
