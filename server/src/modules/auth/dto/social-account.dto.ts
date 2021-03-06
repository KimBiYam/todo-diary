import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SocialAccountDto {
  @ApiProperty({ maxLength: 255 })
  @IsString()
  socialId: string;

  @ApiProperty({ maxLength: 20 })
  @IsString()
  provider: 'google' | 'github';

  @ApiProperty({ maxLength: 100 })
  @IsEmail()
  email: string;

  @ApiProperty({ maxLength: 64 })
  @IsString()
  displayName: string;

  @ApiProperty({ maxLength: 500 })
  @IsString()
  photoUrl?: string;
}
