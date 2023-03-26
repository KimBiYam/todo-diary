import { Diary, QueryFindMyDiariesArgs } from '@generated/graphql';
import { gql, QueryFunctionOptions, useQuery } from '@apollo/client';

export const FIND_MY_DIARIES_QUERY = gql`
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
`;

export default function useDiariesQuery(
  variables: QueryFindMyDiariesArgs,
  options: QueryFunctionOptions<{
    findMyDiaries: Diary[];
  }> = {},
) {
  return useQuery<{ findMyDiaries: Diary[] }>(FIND_MY_DIARIES_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables,
    ...options,
  });
}
