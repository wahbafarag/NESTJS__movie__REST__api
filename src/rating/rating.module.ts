import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { RatingRepository } from './rating.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ratingSchema } from './schemas/rating.schema';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    MongooseModule.forFeature([{ name: 'Rating', schema: ratingSchema }]),
  ],
  providers: [RatingService, RatingRepository],
  controllers: [RatingController],
})
export class RatingModule {}
