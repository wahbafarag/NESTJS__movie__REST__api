import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './schemas/genre.schema';

export class GenreRepository {
  constructor(
    @InjectModel('Genre') private readonly genreModel: Model<Genre>,
  ) {}

  find(filter?: any) {
    return this.genreModel.find(filter);
  }

  findOne(filter: any) {
    return this.genreModel.findOne(filter);
  }

  create(data: any) {
    return this.genreModel.create(data);
  }

  updateOne(filter: any, data: any) {
    return this.genreModel.findOneAndUpdate(filter, data, { new: true });
  }

  // by id or slug
  deleteOne(filter: any) {
    return this.genreModel.findOneAndDelete(filter);
  }
}
