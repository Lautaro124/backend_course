import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entity/user.entitry';
import { RegisterDto } from 'src/common/validators/auth.dto';
import { Repository } from 'typeorm';
import { ChangeEmailDto, UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: RegisterDto) {
    const newUser: User = await this.userRepository.save(user);

    return newUser;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async updateUserData(updateData: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: updateData.email },
    });

    if (!user) {
      return 'User not found';
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateData,
    });

    return updatedUser;
  }

  async changeEmail(updateData: ChangeEmailDto) {
    const user = await this.userRepository.findOne({
      where: { email: updateData.email },
    });

    if (!user) {
      return 'User not found';
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      email: updateData.newEmail,
    });

    return updatedUser;
  }

  getUserData(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  generateLink(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }
}
