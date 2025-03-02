import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTOptions } from 'src/common/configs/JwtOptions.configs';

@Module({
  imports: [UserModule, JwtModule.registerAsync(JWTOptions)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
