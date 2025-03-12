import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../common/validators/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  private comparePasswords(newPassword: string, passwordHash: string) {
    return bcrypt.compare(newPassword, passwordHash);
  }

  async register(registerDto: RegisterDto) {
    try {
      const userExists = await this.userService.findUserByEmail(
        registerDto.email,
      );
      if (userExists) {
        throw new BadRequestException('User already exists');
      }
      registerDto.password = await this.hashPassword(registerDto.password);
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

      const isPasswordValid = await this.comparePasswords(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
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
