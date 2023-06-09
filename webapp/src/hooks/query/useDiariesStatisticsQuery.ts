import { gql, useQuery } from '@apollo/client';
import { graphql } from '@generated/gql';
import {
  DiariesStatisticsByYear,
  QueryGetDiariesStatisticsByYearArgs,
} from '@generated/graphql';

const getDiariesStatisticsByYearQuery = graphql(`
  query GetDiariesStatisticsByYear($year: Float!) {
    getDiariesStatisticsByYear(year: $year) {
      diariesStatisticsByYear {
        finishedDiariesCount
        month
        totalCount
      }
    }
  }
`);

export default function useDiariesStatisticsQuery(
  variables: QueryGetDiariesStatisticsByYearArgs,
) {
  return useQuery(getDiariesStatisticsByYearQuery, { variables });
}
