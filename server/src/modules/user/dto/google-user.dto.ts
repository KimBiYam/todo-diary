import { IsEmail, IsString } from 'class-validator';

export class GoogleUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  picture: string;

  @IsString()
  accessToken: string;
}
