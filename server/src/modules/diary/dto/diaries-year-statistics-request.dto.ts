import { ArgsType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

@ArgsType()
export class DiariesYearStatisticsRequestDto {
  @ApiProperty()
  @IsNumber()
  @Min(1000)
  @Max(9999)
  @Field()
  year: number;
}
