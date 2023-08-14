import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Movie } from '../../movies/schemas/movie.schema';

export class UpdateGenreDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Genre Name is required' })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Genre Description is required' })
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Genre Icon is required' })
  icon: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Movie  is required',
  })
  movie: Movie;
}
