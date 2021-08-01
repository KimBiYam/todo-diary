import { ApiProperty } from '@nestjs/swagger';
import { IsLessThen } from '@src/validators/isLessThen';
import { IsNumber } from 'class-validator';

export class MonthlyStatisticsDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsLessThen(13, { message: 'Month is too bigger!' })
  month: number;
}
