import { gql, MutationFunctionOptions, useMutation } from '@apollo/client';
import { MutationDeleteMyDiaryArgs } from '@generated/graphql';

export default function useDeleteDiaryMutation(
  variables: MutationDeleteMyDiaryArgs,
  options: MutationFunctionOptions = {},
) {
  return useMutation<{ deleteMyDiary: boolean }>(
    gql`
      mutation DeleteMyDiary($id: Int!) {
        deleteMyDiary(id: $id)
      }
    `,
    { variables, ...options },
  );
}
