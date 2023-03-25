import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DiaryDatesDto {
  constructor(dates: number[]) {
    this.dates = dates;
  }

  @Field(() => [Int])
  dates: number[];
}
