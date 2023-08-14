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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dtos/create-rating.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateRatingDto } from './dtos/update-rating.dto';
import { User } from '../users/schemas/user.schema';
import { ParseObjectID } from '../pipes/parse-object-id.pipe';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('averageRate/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'user')
  movieAverageRating(@Param('id', ParseObjectID) id: string) {
    return this.ratingService.movieAverageRating(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'admin')
  find() {
    return this.ratingService.find();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user', 'admin')
  findById(@Param('id', ParseObjectID) id: string) {
    return this.ratingService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  create(
    @Body(ValidationPipe) rating: CreateRatingDto,
    @CurrentUser() user: any,
  ) {
    return this.ratingService.create(rating, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  update(
    @Body(ValidationPipe) rating: UpdateRatingDto,
    @CurrentUser() user: User,
    @Param('id', ParseObjectID) id: string,
  ) {
    return this.ratingService.update(id, rating, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('user')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseObjectID) id: string, @CurrentUser() user: any) {
    return this.ratingService.delete(user._id, id);
  }
}
