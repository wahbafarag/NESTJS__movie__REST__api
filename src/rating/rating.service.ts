import { BadRequestException, Injectable } from '@nestjs/common';
import { RatingRepository } from './rating.repository';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { Rating } from './schemas/rating.schema';
import { User } from '../users/schemas/user.schema';
import { UpdateRatingDto } from './dtos/update-rating.dto';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class RatingService {
  constructor(
    private readonly ratingRepo: RatingRepository,
    private movieService: MoviesService,
  ) {}

  async movieAverageRating(movieId: string) {
    const avgRate = await this.ratingRepo.movieAverageRating(movieId);
    const movie = await this.movieService.findById(movieId);
    movie.averageRating = avgRate.avgRating;
    await movie.save();
    return avgRate;
  }

  async create(rating: CreateRatingDto, user: User): Promise<Rating> {
    const newRating = await this.ratingRepo.create(rating, user);
    const movie = await this.movieService.findById(rating.movieId);
    movie.ratings.push(newRating);
    await movie.save();
    return newRating;
  }

  async update(
    id: string,
    toUpdate: UpdateRatingDto,
    user: User,
  ): Promise<Rating> {
    return await this.ratingRepo.findOneAndUpdate({ _id: id }, toUpdate, user);
  }

  async findById(id: string): Promise<Rating> {
    return await this.ratingRepo.findById(id);
  }

  async delete(user: any, id: string) {
    const review = await this.ratingRepo.findById(id);
    console.log(review, id, user);
    if (review.user.toString() !== user._id.toString()) {
      throw new BadRequestException('You are not the owner of this review');
    }
    return this.ratingRepo.findByIdAndDelete(id);
  }

  async find() {
    return this.ratingRepo.find();
  }
}
