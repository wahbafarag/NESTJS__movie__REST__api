import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private usersModel: Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: CreateUserDto): Promise<{
    user: User;
    token: string;
  }> {
    const { email, password, name, age } = body;
    const emailExists = await this.usersModel.findOne({ email });
    if (emailExists) throw new ConflictException('Email already exists');

    const user = await this.usersModel.create({
      name,
      email,
      age,
      password: await this.hashPass(password),
    });
    await user.save();
    const token = await this.signToken(user.id, this.jwtService);
    return {
      user,
      token,
    };
  }

  async login(logInData: LoginDto): Promise<{ token: string }> {
    const { email, password } = logInData;
    const user = await this.usersModel.findOne({ email }).populate('password');
    if (!user) throw new NotFoundException('Invalid Credentials');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) throw new BadRequestException('Invalid Credentials');

    return { token: await this.signToken(user.id, this.jwtService) };
  }

  async hashPass(pass: string): Promise<string> {
    return await bcrypt.hash(pass, 12);
  }

  async signToken(userID: string, jwtService: JwtService): Promise<string> {
    const payload = { id: userID };
    return jwtService.sign(payload);
  }
}
