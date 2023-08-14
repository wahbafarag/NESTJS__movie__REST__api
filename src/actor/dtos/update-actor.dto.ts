import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Movie } from '../../movies/schemas/movie.schema';

export class UpdateActorDto {
  @IsNotEmpty({ message: 'Actor name is required' })
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty({ message: 'Actor Bio is required' })
  @IsString()
  @IsOptional()
  @MinLength(20, { message: 'Bio must be at least 30 characters' })
  @MaxLength(500, { message: 'Bio must be at most 500 characters' })
  bio: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Actor Photo is required' })
  photo: string;

  @IsNotEmpty({ message: 'Actor should be in movie' })
  @IsOptional()
  movie: Movie;
}
