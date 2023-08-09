import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Movie } from './schemas/movie.schema';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private moviesRepository: MoviesRepository) {}

  async create(movie: CreateMovieDto): Promise<Movie> {
    return await this.moviesRepository.create(movie);
  }

  async find(keyword: string) {
    return await this.moviesRepository.find(keyword);
  }

  async findById(id: string) {
    return await this.moviesRepository.findById(id);
  }

  async findBySlug(slug: string) {
    return await this.moviesRepository.findBySlug(slug);
  }

  async getMostPopular() {
    return await this.moviesRepository.getMostPopular();
  }

  async getLongestMovie() {
    return await this.moviesRepository.getLongestMovie();
  }

  async updateCountOpened(slug: string) {
    return await this.moviesRepository.updateCountOpened(slug);
  }

  async update(slug: string, movie: UpdateMovieDto) {
    return await this.moviesRepository.update(slug, movie);
  }

  async delete(id: string) {
    return this.moviesRepository.delete(id);
  }
}
