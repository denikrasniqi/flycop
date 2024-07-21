import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Length(5, 15)
  email: string;

  @IsString()
  @Length(6, 15)
  password: string;
}
