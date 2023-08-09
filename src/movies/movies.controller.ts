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
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { ParseObjectID } from '../pipes/parse-object-id.pipe';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body(ValidationPipe) body: CreateMovieDto,
    @CurrentUser() user: User,
  ) {
    return this.moviesService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  find(@Query('keyword') keyword: string) {
    return this.moviesService.find(keyword);
  }

  @Get('mostPopularMovie')
  @HttpCode(HttpStatus.OK)
  getMostPopular() {
    return this.moviesService.getMostPopular();
  }

  @Get('longestMovies')
  @HttpCode(HttpStatus.OK)
  getLongestMovie() {
    return this.moviesService.getLongestMovie();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseObjectID) id: string) {
    return this.moviesService.findById(id);
  }

  @Get('slugs/:slug')
  @HttpCode(HttpStatus.OK)
  findBySlug(@Param('slug') slug: string) {
    return this.moviesService.findBySlug(slug);
  }

  @Patch('slug/countOpened/:slug')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  updateCountOpened(@Param('slug') slug: string) {
    return this.moviesService.updateCountOpened(slug);
  }

  @Patch('slug/update/:slug')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  update(
    @Param('slug') slug: string,
    @Body(ValidationPipe) body: UpdateMovieDto,
  ) {
    return this.moviesService.update(slug, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseObjectID) id: string) {
    return this.moviesService.delete(id);
  }
}
