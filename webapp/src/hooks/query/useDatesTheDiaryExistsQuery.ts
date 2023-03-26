import { gql, useQuery } from '@apollo/client';
import {
  DiaryDatesDto,
  QueryGetDatesTheDiaryExistsArgs,
} from '@generated/graphql';

const GET_DATES_THE_DIARY_EXISTS_QUERY = gql`
  query Query($year: Float!, $month: Float!) {
    getDatesTheDiaryExists(year: $year, month: $month) {
      dates
    }
  }
`;

export default function useDatesTheDiaryExistsQuery(
  variables: QueryGetDatesTheDiaryExistsArgs,
) {
  return useQuery<DiaryDatesDto>(GET_DATES_THE_DIARY_EXISTS_QUERY, {
    variables,
  });
}
