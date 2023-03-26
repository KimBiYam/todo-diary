import { gql, QueryFunctionOptions, useQuery } from '@apollo/client';
import { Diary, QueryFindMyDiaryArgs } from '@generated/graphql';

export const FIND_MY_DIARY_QUERY = gql`
  query FindMyDiary($id: Int!) {
    findMyDiary(id: $id) {
      createdAt
      id
      isFinished
      title
      diaryMeta {
        id
        content
      }
    }
  }
`;

export default function useDiaryQuery(
  variables: QueryFindMyDiaryArgs,
  options: QueryFunctionOptions<{ findMyDiary: Diary }> = {},
) {
  return useQuery<{ findMyDiary: Diary }>(FIND_MY_DIARY_QUERY, {
    variables,
    ...options,
  });
}
