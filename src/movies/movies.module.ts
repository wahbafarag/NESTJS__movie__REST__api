import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, movieSchema } from './schemas/movie.schema';
import { MoviesRepository } from './movies.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: movieSchema }]),
  ],
  providers: [MoviesService, MoviesRepository],
  controllers: [MoviesController],
  exports: [MoviesService],
})
export class MoviesModule {}
