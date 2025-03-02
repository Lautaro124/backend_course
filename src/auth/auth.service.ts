import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../common/validators/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.userService.create(registerDto);
      const token = await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      });

      return {
        user: user,
        token: token,
      };
    } catch (error) {
      console.error('🚀 ~ AuthService ~ register ~ error:', error);
      throw new BadRequestException(error);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findUserByEmail(loginDto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      });
      return {
        user: user,
        token: token,
      };
    } catch (error) {
      console.error('🚀 ~ AuthService ~ login ~ error:', error);
      throw new BadRequestException(error);
    }
  }
}
