import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { COOKIE_OPTIONS } from './common/constants/auth.constants';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  app.use(
    cookieParser(process.env.COOKIE_SECRET || 'mi-secreto-super-secreto'),
  );
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'mi-secreto-super-secreto',
      resave: false,
      saveUninitialized: false,
      cookie: COOKIE_OPTIONS,
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
