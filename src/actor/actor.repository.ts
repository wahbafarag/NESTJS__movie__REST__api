import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Actor } from './schemas/actor.schema';
import { Model } from 'mongoose';

@Injectable()
export class ActorRepository {
  constructor(
    @InjectModel('Actor') private readonly actorModel: Model<Actor>,
  ) {}

  async create(actor: any): Promise<Actor> {
    try {
      return await this.actorModel.create(actor);
    } catch (err) {
      if (err.code === 11000) {
        throw new InternalServerErrorException('Actor already exists');
      }
      console.log(err);
      throw new InternalServerErrorException(
        'Unexpected error , try again later',
      );
    }
  }

  async find(filter: any): Promise<Actor[]> {
    return this.actorModel.find(filter);
  }

  async findOne(filter: any): Promise<Actor> {
    return this.actorModel.findOne(filter);
  }

  async findOneAndUpdate(filter: any, update: any): Promise<Actor> {
    return this.actorModel.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });
  }

  async delete(filter: any): Promise<void> {
    this.actorModel.findOneAndDelete(filter);
  }
}
