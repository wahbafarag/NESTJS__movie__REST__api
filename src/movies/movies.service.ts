import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Movie } from './schemas/movie.schema';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { Types } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(private moviesRepository: MoviesRepository) {}

  async getMostPopular() {
    return await this.moviesRepository.getMostPopular();
  }

  async getLongestMovie() {
    return await this.moviesRepository.getLongestMovie();
  }

  async incrementLikesByOne(slug: string) {
    return await this.moviesRepository.findOneAndUpdate(
      { slug },
      {
        $inc: { likes: 1, new: true },
      },
    );
  }

  async incrementDislikesByOne(slug: string) {
    return await this.moviesRepository.findOneAndUpdate(
      { slug },
      {
        $inc: { dislikes: 1, new: true },
      },
    );
  }

  async topLikedMovie() {
    return await this.moviesRepository.findAll();
  }

  async moviesByGenre(genresID: Types.ObjectId[]) {
    return this.moviesRepository.findGenres(genresID);
  }

  async moviesByActor(actorsID: Types.ObjectId) {
    return this.moviesRepository.findByActor(actorsID);
  }

  async updateCountOpened(slug: string) {
    return await this.moviesRepository.updateCountOpened(slug);
  }

  async create(movie: CreateMovieDto): Promise<Movie> {
    return await this.moviesRepository.create(movie);
  }

  async find(keyword: string) {
    return await this.moviesRepository.find(keyword);
  }

  async findById(id: any) {
    return await this.moviesRepository.findById(id);
  }

  async findBySlug(slug: string) {
    return await this.moviesRepository.findBySlug(slug);
  }

  async update(slug: string, movie: UpdateMovieDto) {
    return await this.moviesRepository.update(slug, movie);
  }

  async delete(id: string) {
    return this.moviesRepository.delete(id);
  }
}
