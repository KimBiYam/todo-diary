import {
  Diary,
  FindMyDiariesQuery,
  QueryFindMyDiariesArgs,
} from '@generated/graphql';
import { QueryFunctionOptions, useQuery } from '@apollo/client';
import { graphql } from '@generated/gql';

const findMyDiariesQuery = graphql(`
  query findMyDiaries($offset: Float!, $limit: Float!) {
    findMyDiaries(offset: $offset, limit: $limit) {
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
  variables: QueryFindMyDiariesArgs,
  options: QueryFunctionOptions<FindMyDiariesQuery> = {},
) {
  return useQuery(findMyDiariesQuery, {
    notifyOnNetworkStatusChange: true,
    variables,
    ...options,
  });
}
