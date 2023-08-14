import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Movie } from '../../movies/schemas/movie.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Actor {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  bio: string;

  @Prop({ type: String, required: true })
  photo: string;

  @Prop({ type: String, unique: true })
  slug: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    errorMessage: 'Actor should be in movie',
  })
  movie: Movie;
}

export const actorSchema = SchemaFactory.createForClass(Actor);
actorSchema.set('toJSON', { virtuals: true });
actorSchema.set('toObject', { virtuals: true });
actorSchema.index({ slug: 1 }, { unique: true });
actorSchema.plugin(mongoosePaginate);

// actorSchema.virtual('movie', {
//   ref: 'Movie',
//   localField: 'movie',
//   foreignField: '_id',
// });

//
// validate: {
//   validator: async function (movieId: mongoose.Types.ObjectId) {
//     const actorCount = await this.model('Actor').countDocuments({
//       _id: this._id,
//       movie: movieId,
//       slug: this.slug,
//     });
//     return actorCount === 0;
//   },
//   message: 'Actor with the same name already exists in this movie.',
// },
