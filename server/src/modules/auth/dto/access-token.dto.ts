import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AccessTokenDto {
  @IsString()
  @ApiProperty()
  accessToken: string;
}
