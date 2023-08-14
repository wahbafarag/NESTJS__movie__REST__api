import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { ActorModule } from './actor/actor.module';
import { RatingModule } from './rating/rating.module';
import { GenreModule } from './genre/genre.module';
import { FilesModule } from './files/files.module';
import * as process from 'process';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URI_MONGODB),
    UsersModule,
    AuthModule,
    MoviesModule,
    ActorModule,
    RatingModule,
    GenreModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
