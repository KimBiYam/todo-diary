import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  ValidateIf,
} from 'class-validator';

@ArgsType()
export class GetDiariesArgs {
  @IsNumber()
  @Field()
  offset: number;

  @IsNumber()
  @Field()
  limit: number;

  @ValidateIf((object) => !!object.createdDate)
  @IsDateString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdDate?: string;
}
