import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AnnualStatisticalDto {
  @ApiProperty()
  @IsNumber()
  year: number;
}
