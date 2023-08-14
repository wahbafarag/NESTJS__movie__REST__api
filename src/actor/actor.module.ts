import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { actorSchema } from './schemas/actor.schema';
import { ActorRepository } from './actor.repository';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    MongooseModule.forFeature([{ name: 'Actor', schema: actorSchema }]),
  ],
  providers: [ActorService, ActorRepository],
  controllers: [ActorController],
})
export class ActorModule {}
