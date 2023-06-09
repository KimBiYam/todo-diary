import { QueryFunctionOptions, useQuery } from '@apollo/client';
import { graphql } from '@generated/gql';
import {
  FindMyDiaryQuery,
  FindMyDiaryQueryVariables,
} from '@generated/graphql';

export const findMyDiaryQuery = graphql(`
  query findMyDiary($findMyDiaryId: Int!) {
    findMyDiary(id: $findMyDiaryId) {
      createdAt
      diaryMeta {
        content
      }
      id
      isFinished
      title
    }
  }
`);

export default function useDiaryQuery(
  variables: FindMyDiaryQueryVariables,
  options: QueryFunctionOptions<FindMyDiaryQuery> = {},
) {
  return useQuery(findMyDiaryQuery, {
    variables,
    ...options,
  });
}
