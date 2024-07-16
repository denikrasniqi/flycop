import { IsString, Length, IsNumber } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(5, 15)
  username: string;

  @IsString()
  @Length(6, 15)
  password: string;

  @IsString()
  @Length(5, 15)
  name: string;

  @IsString()
  @Length(5, 50)
  email: string;

  @IsNumber()
  role: number;
}
