import { gql, QueryFunctionOptions, useQuery } from '@apollo/client';
import { Diary, QueryFindMyDiaryArgs } from '@generated/graphql';

export default function useDiaryQuery(
  variables: QueryFindMyDiaryArgs,
  options: QueryFunctionOptions<{ findMyDiary: Diary }> = {},
) {
  return useQuery<{ findMyDiary: Diary }>(
    gql`
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
    `,
    { variables, ...options },
  );
}
