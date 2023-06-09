import { useQuery } from '@apollo/client';
import { graphql } from '@generated/gql';
import { QueryGetDatesTheDiaryExistsArgs } from '@generated/graphql';

const getDatesTheDiaryExistsQuery = graphql(`
  query GetDatesTheDiaryExists($year: Float!, $month: Float!) {
    getDatesTheDiaryExists(year: $year, month: $month) {
      dates
    }
  }
`);

export default function useDatesTheDiaryExistsQuery(
  variables: QueryGetDatesTheDiaryExistsArgs,
) {
  return useQuery(getDatesTheDiaryExistsQuery, {
    variables,
  });
}
