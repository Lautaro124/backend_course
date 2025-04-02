import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entity/user.entitry';
import { RegisterDto } from 'src/common/validators/auth.dto';
import { Like, Not, Repository } from 'typeorm';
import { ChangeEmailDto, UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: RegisterDto) {
    const newUser: User = await this.userRepository.save(user);

    return newUser;
  }

  async findUserByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error finding user by email: ${error.message}`);
      } else {
        this.logger.error('Error finding user by email: Unknown error');
      }
      throw new Error('Error finding user by email');
    }
  }

  async updateUserData(updateData: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: updateData.email },
    });

    if (!user) {
      this.logger.error(`User with email ${updateData.email} not found`);
      return 'User not found';
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateData,
    });
    this.logger.log(`User with email ${updateData.email} updated successfully`);
    return updatedUser;
  }

  async changeEmail(updateData: ChangeEmailDto) {
    const user = await this.userRepository.findOne({
      where: { email: updateData.email },
    });

    if (!user) {
      this.logger.error(`User with email ${updateData.email} not found`);
      return 'User not found';
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      email: updateData.newEmail,
    });
    this.logger.log(
      `User with email ${updateData.email} changed to ${updateData.newEmail}`,
    );
    return updatedUser;
  }

  getUserData(id: number) {
    try {
      return this.userRepository.findOne({
        where: { id },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error finding user by id: ${error.message}`);
      } else {
        this.logger.error('Error finding user by id: Unknown error');
      }
      throw new Error('Error finding user by id');
    }
  }

  searchUser(name: string) {
    try {
      return this.userRepository.findBy({
        fullName: Like(`%${name}%`),
        role: Not('teacher'),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error searching user by name: ${error.message}`);
      } else {
        this.logger.error('Error searching user by name: Unknown error');
      }
      throw new Error('Error searching user by name');
    }
  }

  getAllUsers() {
    try {
      return this.userRepository.find({
        where: {
          role: Not('teacher'),
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error getting all users: ${error.message}`);
      } else {
        this.logger.error('Error getting all users: Unknown error');
      }
      throw new Error('Error getting all users');
    }
  }

  generateLink(id: number) {
    try {
      return this.userRepository.findOne({
        where: { id },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error generating link for user: ${error.message}`);
      } else {
        this.logger.error('Error generating link for user: Unknown error');
      }
      throw new Error('Error generating link for user');
    }
  }
}
