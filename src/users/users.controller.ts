import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ParseObjectID } from '../pipes/parse-object-id.pipe';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  find(@Query('keyword') keyword: string) {
    return this.usersService.find(keyword);
  }

  @Get('count/usersCount')
  @HttpCode(HttpStatus.OK)
  getCound() {
    return this.usersService.getCound();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Query('id', ParseObjectID) id: string) {
    return this.usersService.findById(id);
  }

  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseObjectID) id: string,
    @Body(ValidationPipe) data: UpdateUserDto,
  ) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Query('id', ParseObjectID) id: string) {
    return this.usersService.delete(id);
  }
}
