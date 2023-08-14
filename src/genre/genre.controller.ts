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
import { GenreService } from './genre.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { ParseObjectID } from '../pipes/parse-object-id.pipe';
import { UpdateGenreDto } from './dtos/update-genre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  create(@Body(ValidationPipe) body: CreateGenreDto) {
    return this.genreService.createGenre(body);
  }

  @Get('collection')
  collectionOfMoviesByGenre() {
    return this.genreService.collectionOfMoviesByGenre();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  find(@Query('filter') filter: string) {
    return this.genreService.find(filter);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  findById(@Param('id', ParseObjectID) id: string) {
    return this.genreService.findGenreById(id);
  }

  @Get('BySlug/:slug')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  findBySlug(@Param('slug') slug: string) {
    return this.genreService.findGenreBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  updateById(
    @Param('id', ParseObjectID) id: string,
    @Body(ValidationPipe) body: UpdateGenreDto,
  ) {
    return this.genreService.updateGenreById(id, body);
  }

  @Patch('bySlug/:slug')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  updateBySlug(
    @Param('slug') slug: string,
    @Body(ValidationPipe) body: UpdateGenreDto,
  ) {
    return this.genreService.updateGenreBySlug(slug, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  deleteById(@Param('id', ParseObjectID) id: string) {
    return this.genreService.deleteGenreById(id);
  }

  @Delete('bySlug/:slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  deleteBySlug(@Param('slug') slug: string) {
    return this.genreService.deleteGenreBySlug(slug);
  }
}
