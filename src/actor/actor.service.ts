import { BadRequestException, Injectable } from '@nestjs/common';
import { ActorRepository } from './actor.repository';
import { CreateActorDto } from './dtos/create-actor.dto';
import slugify from 'slugify';
import { Actor } from './schemas/actor.schema';
import { UpdateActorDto } from './dtos/update-actor.dto';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class ActorService {
  constructor(
    private readonly actorRepo: ActorRepository,
    private movieService: MoviesService,
  ) {}

  async create(actor: CreateActorDto): Promise<Actor> {
    const slug = slugify(actor.name, { lower: true });
    const newActor = await this.actorRepo.create({ ...actor, slug });
    const movie = await this.movieService.findById(actor.movie);
    movie.actors.push(newActor);
    await movie.save();
    return newActor;
  }

  async find(filter: any): Promise<Actor[]> {
    return await this.actorRepo.find(filter);
  }

  async findBySlug(slug: string): Promise<Actor> {
    return await this.actorRepo.findOne({ slug });
  }

  async findByActorId(actorID: string): Promise<Actor> {
    return await this.actorRepo.findOne({ _id: actorID });
  }

  async updateByActorId(
    actorID: string,
    actor: UpdateActorDto,
  ): Promise<Actor> {
    let slug: string;
    if (actor.name) {
      slug = slugify(actor.name, { lower: true });
    }
    return await this.actorRepo.findOneAndUpdate(
      { _id: actorID },
      { ...actor, slug },
    );
  }

  async updateBySlug(slug: string, actor: UpdateActorDto): Promise<Actor> {
    if (actor.name) {
      throw new BadRequestException(
        'You cannot change the name of the actor , to change the name hit this route /actor/:actorID',
      );
    }
    return await this.actorRepo.findOneAndUpdate({ slug }, actor);
  }

  async deleteByActorId(actorID: string): Promise<void> {
    return await this.actorRepo.delete({ _id: actorID });
  }

  async deleteBySlug(slug: string): Promise<void> {
    return await this.actorRepo.delete({ slug });
  }
}
