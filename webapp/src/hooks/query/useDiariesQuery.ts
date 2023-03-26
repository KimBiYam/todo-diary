import { Diary, QueryFindMyDiariesArgs } from '@generated/graphql';
import { gql, QueryFunctionOptions, useQuery } from '@apollo/client';

export default function useDiariesQuery(
  variables: QueryFindMyDiariesArgs,
  options: QueryFunctionOptions<{
    findMyDiaries: Diary[];
  }> = {},
) {
  return useQuery<{ findMyDiaries: Diary[] }>(
    gql`
      query Query($offset: Float!, $limit: Float!) {
        findMyDiaries(offset: $offset, limit: $limit) {
          createdAt
          diaryMeta {
            id
            content
          }
          id
          isFinished
          title
        }
      }
    `,
    { notifyOnNetworkStatusChange: true, variables, ...options },
  );
}
