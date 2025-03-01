import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../common/validators/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.userService.create(registerDto);

      return user;
    } catch (error) {
      console.error('🚀 ~ AuthService ~ register ~ error:', error);
      throw new BadRequestException(error);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findUserByEmailAndPass(loginDto);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (error) {
      console.error('🚀 ~ AuthService ~ login ~ error:', error);
      throw new BadRequestException(error);
    }
  }
}
