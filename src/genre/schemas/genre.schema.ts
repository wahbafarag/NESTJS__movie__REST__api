import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Movie } from '../../movies/schemas/movie.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Genre {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, unique: true })
  slug: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  icon: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true })
  movie: Movie;
}

export const genreSchema = SchemaFactory.createForClass(Genre);
genreSchema.index({ name: 1, slug: 1 }, { unique: true });
