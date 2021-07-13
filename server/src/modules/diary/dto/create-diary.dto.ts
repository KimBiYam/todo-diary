import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDiaryDto {
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(5000)
  @ApiProperty()
  @IsNotEmpty()
  content: string;
}
