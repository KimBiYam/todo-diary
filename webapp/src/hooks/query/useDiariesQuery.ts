import { Diary, QueryFindMyDiariesArgs } from '@generated/graphql';
import { gql, QueryFunctionOptions, useQuery } from '@apollo/client';

export default function useDiariesQuery(
  variables: QueryFindMyDiariesArgs,
  options: QueryFunctionOptions<{ findMyDiaries: Diary[] }> = {},
) {
  return useQuery<{ findMyDiaries: Diary[] }>(
    gql`
      query Query($page: Float!, $limit: Float!, $createdDate: String) {
        findMyDiaries(page: $page, limit: $limit, createdDate: $createdDate) {
          title
          isFinished
          id
          createdAt
          diaryMeta {
            id
            content
          }
        }
      }
    `,
    { variables, ...options },
  );
}

// type DiariesQueryParams = {
//   limit: number;
//   createdDate?: string;
// };

// const useDiariesQuery = (
//   { limit, createdDate }: DiariesQueryParams,
//   options: UseInfiniteQueryOptions<Diary[], string> = {},
// ) =>
//   useInfiniteQuery(
//     createKey(createdDate),
//     ({ pageParam = 1 }) => diaryApi.getDiaries(pageParam, limit, createdDate),
//     {
//       getNextPageParam: (lastPage, allPages) => {
//         return lastPage.length === limit ? allPages.length + 1 : undefined;
//       },
//       ...options,
//     },
//   );

// const defaultKey = 'diaries';
// const createKey = (createdDate?: string) => [defaultKey, createdDate];

// useDiariesQuery.defaultKey = defaultKey;
// useDiariesQuery.createKey = createKey;

// export default useDiariesQuery;
