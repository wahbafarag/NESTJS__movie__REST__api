import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async find(keyword: string): Promise<User[]> {
    let options = {};
    if (keyword) {
      options = {
        $or: [
          { email: { $regex: keyword, $options: 'i' } },
          { name: { $regex: keyword, $options: 'i' } },
        ],
      };
    }
    return this.userModel
      .find(options)
      .sort({ createdAt: -1 })
      .select('-password -__v')
      .exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async getCound(): Promise<number> {
    return this.userModel.find().count().exec();
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const emailExists = await this.userModel.findOne({ email: data.email });
    if (emailExists && String(emailExists._id) !== String(id)) {
      throw new BadRequestException('Email already exists');
    }

    if (data.password) {
      throw new BadRequestException(
        'This route is implemented for admins , please use /auth/change-password',
      );
    }

    const user = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async delete(id: string): Promise<void> {
    return this.userModel.findByIdAndDelete(id);
  }
}
