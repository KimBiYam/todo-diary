import {
  FindMyDiariesQuery,
  FindMyDiariesQueryVariables,
} from '@generated/graphql';
import { QueryFunctionOptions, useQuery } from '@apollo/client';
import { graphql } from '@generated/gql';

export const findMyDiariesQuery = graphql(`
  query findMyDiaries($offset: Float!, $limit: Float!, $createdDate: String) {
    findMyDiaries(offset: $offset, limit: $limit, createdDate: $createdDate) {
      title
      createdAt
      diaryMeta {
        id
        content
      }
      id
      isFinished
    }
  }
`);

export default function useDiariesQuery(
  variables: FindMyDiariesQueryVariables,
  options: QueryFunctionOptions<FindMyDiariesQuery> = {},
) {
  return useQuery(findMyDiariesQuery, {
    notifyOnNetworkStatusChange: true,
    variables,
    ...options,
  });
}
