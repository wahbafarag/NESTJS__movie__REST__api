import { IsNotEmpty, IsString } from 'class-validator';
import { Movie } from '../../movies/schemas/movie.schema';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty({ message: 'Genre Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Genre Description is required' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Genre Icon is required' })
  icon: string;

  @IsNotEmpty({
    message: 'Movie  is required',
  })
  movie: Movie;
}
