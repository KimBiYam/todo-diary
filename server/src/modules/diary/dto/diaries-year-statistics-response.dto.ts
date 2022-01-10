export class DiariesYearStatisticsResponseDto {
  diariesStatisticsByYear: {
    totalCount: number;
    finishedDiariesCount: number;
    month: number;
  }[];
}
