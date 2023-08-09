import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';
import { Model } from 'mongoose';
import { ForbiddenException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    const user = await this.usersModel.findById(id);
    if (!user) throw new ForbiddenException('Access Denied ,Login first');
    return user;
  }
}
