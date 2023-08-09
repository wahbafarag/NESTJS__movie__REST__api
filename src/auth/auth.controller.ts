import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Post('/login')
  login(@Body(ValidationPipe) body: LoginDto) {
    return this.authService.login(body);
  }
}
