export class DiariesStatisticsResponseDto {
  diariesStatisticsByYear: {
    totalCount: number;
    finishedDiariesCount: number;
    month: number;
  }[];
}
