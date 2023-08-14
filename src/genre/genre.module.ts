import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { GenreRepository } from './genre.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { genreSchema } from './schemas/genre.schema';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    MongooseModule.forFeature([{ name: 'Genre', schema: genreSchema }]),
  ],
  providers: [GenreService, GenreRepository],
  controllers: [GenreController],
})
export class GenreModule {}
