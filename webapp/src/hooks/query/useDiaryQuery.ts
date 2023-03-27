import { QueryFunctionOptions, useQuery } from '@apollo/client';
import { gql } from '@generated/gql';
import { Diary, QueryFindMyDiaryArgs } from '@generated/graphql';

export default function useDiaryQuery(
  variables: QueryFindMyDiaryArgs,
  options: QueryFunctionOptions<{ findMyDiary: Diary }> = {},
) {
  return useQuery<{ findMyDiary: Diary }>(gql, {
    variables,
    ...options,
  });
}
