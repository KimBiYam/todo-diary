import { gql, useQuery } from '@apollo/client';
import { Diary } from '@generated/graphql';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import diaryApi from '../../api/diaryApi';

type DiariesQueryParams = {
  limit: number;
  createdDate?: string;
};

const useTestA = ({ limit, createdDate }: DiariesQueryParams) => {
  useQuery<Diary[]>(gql`
query FindMyDiaries(limit: ${limit},createdDate:${createdDate}  ){
    createdAt
  isFinished
      id
      title
      diaryMeta{
        content
        id
      }
    }
  )
  
    `);
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
