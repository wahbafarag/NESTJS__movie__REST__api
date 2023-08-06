import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @Min(16, { message: 'You are too young to use this app' })
  @Max(65, { message: 'You are too old to use this app' })
  age: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(30, { message: 'Password is too long' })
  password: string;
}
