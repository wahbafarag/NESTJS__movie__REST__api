import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Email can not be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password can not be empty' })
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(30, { message: 'Password is too long' })
  password: string;
}
