import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateDiaryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  content?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  @Field({ nullable: true })
  isFinished?: boolean;
}
