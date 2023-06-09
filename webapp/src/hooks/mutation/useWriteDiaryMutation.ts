import { MutationFunctionOptions, useMutation } from '@apollo/client';
import { graphql } from '@generated/gql';
import { Diary, MutationCreateDiaryArgs } from '@generated/graphql';

export default function useWriteDiaryMutation(
  variables: MutationCreateDiaryArgs,
  options: MutationFunctionOptions<{ createDiary: Diary }> = {},
) {
  return useMutation<{ createDiary: Diary }>(
    graphql(`
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
    `),
    { variables, ...options },
  );
}
