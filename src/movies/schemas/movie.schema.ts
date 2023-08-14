import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Actor } from '../../actor/schemas/actor.schema';
import { Rating } from '../../rating/schemas/rating.schema';
import { Genre } from '../../genre/schemas/genre.schema';

export class Parameter {
  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  country: string;
}

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true, errorMessage: 'Movie Poster is required' })
  poster: string;

  @Prop({ required: true, errorMessage: 'Movie BigPoster is required' })
  bigPoster: string;

  @Prop({ required: true, errorMessage: 'Movie Title is required' })
  title: string;

  @Prop({ required: true })
  parameters: Parameter;

  @Prop({
    unique: true,
    select: true,
    errorMessage: 'This slug already exists',
  })
  slug?: string;

  @Prop({ default: 0 })
  countOpened?: number;

  @Prop({ default: 0 })
  likes?: number;

  @Prop({ default: 0 })
  dislikes?: number;

  @Prop({
    required: true,
    message: 'Movie should have actors',
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
    ref: 'Actor',
  })
  actors: Actor[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    ref: 'Genre',
  })
  genres: Genre[];

  @Prop({ default: 4.5 })
  averageRating?: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }] })
  ratings?: Rating[];
}

export const movieSchema = SchemaFactory.createForClass(Movie);

movieSchema.index({ slug: 1 }, { unique: true });
