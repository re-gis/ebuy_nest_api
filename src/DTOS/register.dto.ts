/* eslint-disable */
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

/* eslint-disable */
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
