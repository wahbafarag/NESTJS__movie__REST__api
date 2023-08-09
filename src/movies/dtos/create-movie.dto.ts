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
  duration: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Year is required' })
  year: number;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;
}

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty({ message: 'Movie Poster is required' })
  poster: string;

  @IsString()
  @IsNotEmpty({ message: 'Movie BigPoster is required' })
  bigPoster: string;

  @IsString()
  @IsNotEmpty({ message: 'Movie Title is required' })
  title: string;

  @IsNotEmpty({ message: 'Parameters is required , Duration,year and country' })
  parameters: Parameter;

  @IsNumber()
  @IsNotEmpty({ message: 'CountOpened is required' })
  @Min(0, { message: 'CountOpened must be greater than or equal to 0' })
  @IsOptional()
  countOpened?: number;
}
