import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rating } from './schemas/rating.schema';
import { InternalServerErrorException } from '@nestjs/common';

export class RatingRepository {
  constructor(
    @InjectModel('Rating') private readonly ratingModel: Model<Rating>,
  ) {}

  async movieAverageRating(movieId: Types.ObjectId | string) {
    const avgRate = await this.ratingModel
      .aggregate()
      .match({ movieId: new Types.ObjectId(movieId) })
      .exec();

    return {
      avgRating:
        avgRate.reduce((acc, review) => acc + review.rating.value, 0) /
        avgRate.length,
    };
  }

  create(toInsert: any, user: any): Promise<Rating> {
    try {
      const data = Object.assign(toInsert, { user: user._id });
      return this.ratingModel.create(data);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  findOneAndUpdate(filter: any, update: any, user: any): Promise<Rating> {
    try {
      const data = Object.assign(update, { user: user._id });
      return this.ratingModel.findOneAndUpdate(filter, data, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  findByIdAndDelete(id: string) {
    try {
      return this.ratingModel.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  findById(id: string): Promise<Rating> {
    try {
      return this.ratingModel.findById(id);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  find() {
    try {
      return this.ratingModel.find();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  findOne(filter: any) {
    return this.ratingModel.findOne(filter);
  }
}
