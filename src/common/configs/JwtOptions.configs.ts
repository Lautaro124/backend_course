import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const JWTOptions: JwtModuleAsyncOptions = {
  global: true,
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRATION'),
    },
  }),
  inject: [ConfigService],
};
