import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entity/user.entitry';
import { RegisterDto } from 'src/common/validators/auth.dto';
import { Repository } from 'typeorm';

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
}
