import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateDiaryDto {
  @IsString()
  @MaxLength(100)
  @ApiProperty()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @MaxLength(5000)
  @ApiProperty()
  @IsNotEmpty()
  @Field()
  content: string;
}
