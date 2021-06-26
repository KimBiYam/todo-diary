import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateDiaryDto {
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  title: string;

  @IsString()
  @MaxLength(5000)
  @ApiProperty()
  content: string;
}
