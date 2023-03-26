import { gql, MutationFunctionOptions, useMutation } from '@apollo/client';
import { MutationUpdateMyDiaryArgs } from '@generated/graphql';

export default function useUpdateDiaryMutation(
  variables: MutationUpdateMyDiaryArgs,
  options: MutationFunctionOptions = {},
) {
  return useMutation(
    gql`
      mutation UpdateMyDiary($updateDiaryDto: UpdateDiaryDto!, $id: Int!) {
        updateMyDiary(updateDiaryDto: $updateDiaryDto, id: $id) {
          title
          diaryMeta {
            content
          }
        }
      }
    `,
    { variables, ...options },
  );
}
