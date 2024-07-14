import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(5, 15)
  username: string;

  @IsString()
  @Length(6, 15)
  password: string;
}
