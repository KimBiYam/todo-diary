import { ArgsType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  ValidateIf,
} from 'class-validator';

@ArgsType()
export class GetDiariesDto {
  @ApiProperty({ required: true, example: 1 })
  @IsNumber()
  @Field()
  page: number;

  @ApiProperty({ required: true, example: 10 })
  @IsNumber()
  @Field()
  limit: number;

  @ApiProperty({ required: false, nullable: true })
  @ValidateIf((object) => !!object.createdDate)
  @IsDateString()
  @Field(() => String, { nullable: true })
  @IsOptional()
  createdDate?: string;
}
