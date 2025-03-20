import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from '../common/validators/auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import {
  COOKIE_NAME,
  COOKIE_OPTIONS,
} from 'src/common/constants/auth.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('🚀 ~ AuthController ~ login ~ loginDto:', loginDto);
    const { user, token } = await this.authService.login(loginDto);
    response.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('🚀 ~ AuthController ~ register ~ registerDto:', registerDto);
    const { user, token } = await this.authService.register(registerDto);
    response.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);

    return user;
  }
}
