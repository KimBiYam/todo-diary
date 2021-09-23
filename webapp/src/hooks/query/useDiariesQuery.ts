import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';
import { Diary } from '../../types/diary.types';

const useDiariesQuery = (
  limit: number,
  options: UseInfiniteQueryOptions<Diary[], string> = {},
) =>
  useInfiniteQuery(
    createKey(),
    ({ pageParam = 1 }) => diaryApi.getDiaries(pageParam, limit),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === limit ? allPages.length + 1 : undefined;
      },
      ...options,
    },
  );

const createKey = () => 'diaries';

useDiariesQuery.createKey = createKey;

export default useDiariesQuery;
