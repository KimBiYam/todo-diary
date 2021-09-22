import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class DiariesExistsDatesDto {
  @ApiProperty()
  @IsNumber()
  @Min(1000)
  @Max(9999)
  year: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;
}
