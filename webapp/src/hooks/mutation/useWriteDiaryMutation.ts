import { gql, MutationFunctionOptions, useMutation } from '@apollo/client';
import { Diary, MutationCreateDiaryArgs } from '@generated/graphql';

export default function useWriteDiaryMutation(
  variables: MutationCreateDiaryArgs,
  options: MutationFunctionOptions<{ createDiary: Diary }> = {},
) {
  return useMutation<{ createDiary: Diary }>(
    gql`
      mutation CreateDiary($createDiaryDto: CreateDiaryDto!) {
        createDiary(createDiaryDto: $createDiaryDto) {
          title
          id
          createdAt
          isFinished
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
