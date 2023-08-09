import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class Parameter {
  @IsNumber()
  @IsNotEmpty({ message: 'Duration is required' })
  @IsOptional()
  duration: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Year is required' })
  @IsOptional()
  year: number;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  @IsOptional()
  country: string;
}

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty({ message: 'Movie Poster is required' })
  @IsOptional()
  poster: string;

  @IsString()
  @IsNotEmpty({ message: 'Movie BigPoster is required' })
  @IsOptional()
  bigPoster: string;

  @IsString()
  @IsNotEmpty({ message: 'Movie Title is required' })
  @IsOptional()
  title: string;

  @IsNotEmpty({ message: 'Parameters is required , Duration,year and country' })
  @IsOptional()
  parameters: Parameter;

  @IsNumber()
  @IsNotEmpty({ message: 'CountOpened is required' })
  @Min(0, { message: 'CountOpened must be greater than or equal to 0' })
  @IsOptional()
  countOpened?: number;
}
