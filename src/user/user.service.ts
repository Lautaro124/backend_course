import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entity/user.entitry';
import { LoginDto, RegisterDto } from 'src/common/validators/auth.dto';
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

  async findUserByEmailAndPass({ email, password }: LoginDto) {
    return await this.userRepository.findOne({
      where: { email, password },
    });
  }
}
