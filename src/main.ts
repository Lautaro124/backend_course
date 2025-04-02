import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { COOKIE_OPTIONS } from './common/constants/auth.constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      timestamp: true,
      context: 'Lidreazgo api',
      logLevels: ['error', 'warn', 'log', 'debug', 'verbose'],
    }),
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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('Liderazgo api')
    .setDescription('Api de curso de liderazgo')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
