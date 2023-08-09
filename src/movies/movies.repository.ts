import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Movie } from './schemas/movie.schema';
import { CreateMovieDto } from './dtos/create-movie.dto';
import slugify from 'slugify';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Injectable()
export class MoviesRepository {
  constructor(@InjectModel('Movie') private moviesModel: Model<Movie>) {}

  async create(movie: CreateMovieDto): Promise<Movie> {
    const movieSlug = slugify(movie.title, { lower: true });

    const newMovie = await this.moviesModel.create(movie);
    newMovie.slug = movieSlug;
    await newMovie.save();
    return newMovie;
  }

  async find(keyword: string) {
    let options = {};

    if (keyword) {
      options = {
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { slug: { $regex: keyword, $options: 'i' } },
        ],
      };
    }

    return this.moviesModel
      .find(options)
      .sort('-createdAt')
      .select('-updatedAt -__v')
      .exec();
  }

  async findById(id: string) {
    if (!(await this.moviesModel.findById(id)))
      throw new NotFoundException('Movie not found');
    return this.moviesModel.findById(id);
  }

  async findBySlug(slug: string) {
    if (!(await this.moviesModel.findOne({ slug })))
      throw new NotFoundException('Movie not found');
    return this.moviesModel.findOne({ slug });
  }

  async getMostPopular() {
    return this.moviesModel
      .find({ countOpened: { $gte: 12 } })
      .sort({ countOpened: -1 })
      .exec();
  }

  async getLongestMovie() {
    return this.moviesModel
      .find({ 'parameters.duration': { $gt: 120 } })
      .sort({ 'parameters.duration': -1 })
      .exec();
  }

  async updateCountOpened(slug: string) {
    return this.moviesModel.findOneAndUpdate(
      { slug },
      { $inc: { countOpened: 1, new: true } },
    );
  }

  async update(slug: string, movie: UpdateMovieDto) {
    if (!(await this.moviesModel.findOne({ slug })))
      throw new NotFoundException('Movie not found');

    const newMovie = await this.moviesModel.findOneAndUpdate({ slug }, movie, {
      new: true,
      runValidators: true,
    });
    newMovie.slug = slugify(newMovie.title, { lower: true });
    await newMovie.save();
    return newMovie;
  }

  async delete(id: string) {
    if (!(await this.moviesModel.findById(id)))
      throw new NotFoundException('Movie not found');
    this.moviesModel.findByIdAndDelete(id);
  }
}
