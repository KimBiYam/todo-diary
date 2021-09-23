import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDiaryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  content?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  isFinished?: boolean;
}
