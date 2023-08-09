import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const movieSchema = SchemaFactory.createForClass(Movie);

movieSchema.index({ slug: 1 }, { unique: true });
