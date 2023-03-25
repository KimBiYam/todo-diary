import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DiariesYearStatisticsResponseDto {
  @Field(() => [DiariesStatisticsByYear])
  diariesStatisticsByYear: DiariesStatisticsByYear[];
}

@ObjectType()
class DiariesStatisticsByYear {
  @Field()
  totalCount: number;
  @Field()
  finishedDiariesCount: number;
  @Field()
  month: number;
}
