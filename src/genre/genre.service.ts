import { Injectable, NotFoundException } from '@nestjs/common';
import { GenreRepository } from './genre.repository';
import { CreateGenreDto } from './dtos/create-genre.dto';
import slugify from 'slugify';
import { MoviesService } from '../movies/movies.service';
import { UpdateGenreDto } from './dtos/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    private readonly genreRepo: GenreRepository,
    private readonly movieService: MoviesService,
  ) {}

  async collectionOfMoviesByGenre(): Promise<any> {
    const genres = await this.find();
    const collection = [];
    for (const genre of genres) {
      const movies = await this.movieService.moviesByGenre([genre._id]);
      const result = {
        _id: String(genre._id),
        title: String(genre.name),
        slug: String(genre.slug),
        icon: genre.icon,
      };
      collection.push({ ...result, movies });
    }
    return collection;
  }

  find(filter?: string): Promise<any> {
    let options = {};

    if (filter) {
      options = {
        $or: [
          {
            name: { $regex: filter, $options: 'i' },
          },
          {
            slug: { $regex: filter, $options: 'i' },
          },
          {
            description: { $regex: filter, $options: 'i' },
          },
        ],
      };
    }

    return this.genreRepo.find(options).sort({ createdAt: -1 }).exec();
  }

  async findGenreById(filter: any): Promise<any> {
    return await this.genreRepo.findOne({ _id: filter }).exec();
  }

  async findGenreBySlug(filter: any): Promise<any> {
    return await this.genreRepo.findOne({ slug: filter }).exec();
  }

  async createGenre(data: CreateGenreDto): Promise<any> {
    const newGenre = await this.genreRepo.create(data);
    newGenre.slug = slugify(newGenre.name, { lower: true });
    const movie = await this.movieService.findById(data.movie);
    movie.genres.push(newGenre);
    await movie.save();
    return await newGenre.save();
  }

  async updateGenreById(filter: any, data: UpdateGenreDto): Promise<any> {
    let slug: string;
    if (data.name) {
      slug = slugify(data.name, { lower: true });
    }
    const genre = await this.genreRepo.findOne({ _id: filter });

    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return this.genreRepo.updateOne({ _id: filter }, { ...data, slug });
  }

  async updateGenreBySlug(filter: any, data: UpdateGenreDto): Promise<any> {
    let slug: string;
    if (data.name) {
      slug = slugify(data.name, { lower: true });
    }
    const genre = await this.genreRepo.findOne({ slug: filter });
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return this.genreRepo.updateOne({ slug: filter }, { ...data, slug });
  }

  async deleteGenreById(filter: any): Promise<any> {
    const genre = await this.genreRepo.findOne({ _id: filter });
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return this.genreRepo.deleteOne({ _id: filter });
  }

  async deleteGenreBySlug(filter: any): Promise<any> {
    const genre = await this.genreRepo.findOne({ slug: filter });
    if (!genre) {
      throw new NotFoundException('Genre not found');
    }
    return this.genreRepo.deleteOne({ slug: filter });
  }
}
