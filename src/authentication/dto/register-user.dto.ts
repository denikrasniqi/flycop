import { IsString, Length, IsNumber, IsEmail, IsOptional } from 'class-validator';

export class RegisterUserDto {

  @IsOptional()
  @IsString()
  @Length(6, 15)
  password: string;

  @IsString()
  @Length(5, 15)
  name: string;

  @IsEmail()
  @Length(5, 50)
  email: string;

  @IsOptional()
  @IsNumber()
  role: number;
}
