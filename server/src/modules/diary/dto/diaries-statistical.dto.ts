import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class DiariesStatisticalDto {
  @ApiProperty()
  @IsNumber()
  @Min(1000)
  @Max(9999)
  year: number;
}
