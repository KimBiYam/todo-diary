import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleAccessTokenDto {
  @IsString()
  @ApiProperty()
  googleAccessToken: string;
}
