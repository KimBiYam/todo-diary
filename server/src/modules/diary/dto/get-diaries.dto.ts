import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, ValidateIf } from 'class-validator';

export class GetDiariesDto {
  @ApiProperty({ required: true, example: 1 })
  @IsNumber()
  page: number;

  @ApiProperty({ required: true, example: 10 })
  @IsNumber()
  limit: number;

  @ApiProperty({ required: false, nullable: true })
  @ValidateIf((object) => !!object.createdDate)
  @IsDateString()
  createdDate?: string;
}
