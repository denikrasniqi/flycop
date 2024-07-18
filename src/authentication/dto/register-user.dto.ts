import { IsString, Length, IsNumber, IsEmail } from 'class-validator';

export class RegisterUserDto {

  @IsString()
  @Length(6, 15)
  password: string;

  @IsString()
  @Length(5, 15)
  name: string;

  @IsEmail()
  @Length(5, 50)
  email: string;

  @IsNumber()
  role: number;
}
