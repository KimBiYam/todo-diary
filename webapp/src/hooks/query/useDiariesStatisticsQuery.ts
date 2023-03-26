import { gql, useQuery } from '@apollo/client';
import {
  DiariesStatisticsByYear,
  QueryGetDiariesStatisticsByYearArgs,
} from '@generated/graphql';

export const GET_DIARIES_STATISTICS_BY_YEAR_QUERY = gql`
  query DiariesStatisticsByYear($year: Float!) {
    getDiariesStatisticsByYear(year: $year) {
      diariesStatisticsByYear {
        finishedDiariesCount
        month
        totalCount
      }
    }
  }
`;

export default function useDiariesStatisticsQuery(
  variables: QueryGetDiariesStatisticsByYearArgs,
) {
  return useQuery<DiariesStatisticsByYear[]>(
    GET_DIARIES_STATISTICS_BY_YEAR_QUERY,
    { variables },
  );
}
