import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GithubOAuthDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  code: string;
}
