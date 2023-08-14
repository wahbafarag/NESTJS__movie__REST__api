import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dtos/create-actor.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ParseObjectID } from '../pipes/parse-object-id.pipe';
import { UpdateActorDto } from './dtos/update-actor.dto';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  create(@Body(ValidationPipe) actor: CreateActorDto) {
    return this.actorService.create(actor);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  find(@Query() filter: any) {
    return this.actorService.find(filter);
  }

  @Get('slug')
  findBySlug(@Query('slug') slug: string) {
    return this.actorService.findBySlug(slug);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  findById(@Param('id', ParseObjectID) id: string) {
    return this.actorService.findByActorId(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  updateByActorId(
    @Body() actor: UpdateActorDto,
    @Param('id', ParseObjectID) id: string,
  ) {
    return this.actorService.updateByActorId(id, actor);
  }

  @Patch('bySlug/slug')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  updateBySlug(@Body() actor: UpdateActorDto, @Query('slug') slug: string) {
    return this.actorService.updateBySlug(slug, actor);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteByActorId(@Param('id', ParseObjectID) id: string) {
    return this.actorService.deleteByActorId(id);
  }

  @Delete('bySlug/slug')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteBySlug(@Query('slug') slug: string) {
    return this.actorService.deleteBySlug(slug);
  }
}
