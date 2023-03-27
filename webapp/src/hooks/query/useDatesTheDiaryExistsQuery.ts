import { gql, useQuery } from '@apollo/client';
import {
  DiaryDatesDto,
  QueryGetDatesTheDiaryExistsArgs,
} from '@generated/graphql';

export default function useDatesTheDiaryExistsQuery(
  variables: QueryGetDatesTheDiaryExistsArgs,
) {
  return useQuery<DiaryDatesDto>(
    gql`
      query GetDatesTheDiaryExists($year: Float!, $month: Float!) {
        getDatesTheDiaryExists(year: $year, month: $month) {
          dates
        }
      }
    `,
    {
      variables,
    },
  );
}
