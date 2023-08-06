import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async find(keyword: string): Promise<User[]> {
    return await this.usersRepository.find(keyword);
  }

  async findById(id: string): Promise<User> {
    return await this.usersRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findByEmail(email);
  }

  async getCound(): Promise<number> {
    return await this.usersRepository.getCound();
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return await this.usersRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return await this.usersRepository.delete(id);
  }
}
