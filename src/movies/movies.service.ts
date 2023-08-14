import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { Movie } from './schemas/movie.schema';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { Types } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(private moviesRepository: MoviesRepository) {}

  async getMostPopular(): Promise<Movie[]> {
    return await this.moviesRepository.getMostPopular();
  }

  async getLongestMovie() {
    return await this.moviesRepository.getLongestMovie();
  }

  async incrementLikesByOne(slug: string): Promise<Movie> {
    return await this.moviesRepository.findOneAndUpdate(
      { slug },
      {
        $inc: { likes: 1, new: true },
      },
    );
  }

  async incrementDislikesByOne(slug: string): Promise<Movie> {
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

  async moviesByGenre(genresID: Types.ObjectId[]): Promise<Movie[]> {
    return this.moviesRepository.findGenres(genresID);
  }

  async moviesByActor(actorsID: Types.ObjectId): Promise<Movie[]> {
    return this.moviesRepository.findByActor(actorsID);
  }

  async updateCountOpened(slug: string): Promise<Movie> {
    return await this.moviesRepository.updateCountOpened(slug);
  }

  async create(movie: CreateMovieDto): Promise<Movie> {
    return await this.moviesRepository.create(movie);
  }

  async find(keyword: string): Promise<Movie[]> {
    return await this.moviesRepository.find(keyword);
  }

  async findById(id: any): Promise<Movie> {
    return await this.moviesRepository.findById(id);
  }

  async findBySlug(slug: string): Promise<Movie> {
    return await this.moviesRepository.findBySlug(slug);
  }

  async update(slug: string, movie: UpdateMovieDto): Promise<Movie> {
    return await this.moviesRepository.update(slug, movie);
  }

  async delete(id: string): Promise<void> {
    return this.moviesRepository.delete(id);
  }
}
