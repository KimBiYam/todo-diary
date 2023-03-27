import { gql, useQuery } from '@apollo/client';
import {
  DiariesStatisticsByYear,
  QueryGetDiariesStatisticsByYearArgs,
} from '@generated/graphql';

export default function useDiariesStatisticsQuery(
  variables: QueryGetDiariesStatisticsByYearArgs,
) {
  return useQuery<DiariesStatisticsByYear[]>(
    gql`
      query GetDiariesStatisticsByYear($year: Float!) {
        getDiariesStatisticsByYear(year: $year) {
          diariesStatisticsByYear {
            finishedDiariesCount
            month
            totalCount
          }
        }
      }
    `,
    { variables },
  );
}
