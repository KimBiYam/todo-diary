import { useQuery } from '@apollo/client';
import { graphql } from '@generated/gql';
import {
  GetDatesTheDiaryExistsQueryVariables,
  QueryGetDatesTheDiaryExistsArgs,
} from '@generated/graphql';

const getDatesTheDiaryExistsQuery = graphql(`
  query GetDatesTheDiaryExists($year: Float!, $month: Float!) {
    getDatesTheDiaryExists(year: $year, month: $month) {
      dates
    }
  }
`);

export default function useDatesTheDiaryExistsQuery(
  variables: GetDatesTheDiaryExistsQueryVariables,
) {
  return useQuery(getDatesTheDiaryExistsQuery, {
    variables,
  });
}
