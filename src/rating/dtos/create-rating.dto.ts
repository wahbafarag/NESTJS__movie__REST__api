import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class Review {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Max(5)
  @Min(1)
  value?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  @MinLength(5)
  comment?: string;
}

export class CreateRatingDto {
  @IsEmpty({
    message: 'We know who you are! ,You dont have to identify yourself',
  })
  user: string;

  @IsString()
  @IsNotEmpty()
  movieId: string;

  @IsNotEmpty()
  rating: Review;
}
