import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class Review {
  @Prop({ required: true, type: Number })
  value?: number;

  @Prop({ required: true, type: String })
  comment?: string;
}

@Schema({ timestamps: true })
export class Rating {
  @Prop({ required: true, type: String })
  user: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Movie' })
  movieId: string;

  @Prop({ required: true })
  rating: Review;
}

export const ratingSchema = SchemaFactory.createForClass(Rating);
ratingSchema.index({ userId: 1, movieId: 1 }, { unique: true });
