import { MutationFunctionOptions, useMutation } from '@apollo/client';
import { graphql } from '@generated/gql';
import { MutationDeleteMyDiaryArgs } from '@generated/graphql';

export default function useDeleteDiaryMutation(
  variables: MutationDeleteMyDiaryArgs,
  options: MutationFunctionOptions = {},
) {
  return useMutation<{ deleteMyDiary: boolean }>(
    graphql(`
      mutation DeleteMyDiary($id: Int!) {
        deleteMyDiary(id: $id)
      }
    `),
    { variables, ...options },
  );
}
