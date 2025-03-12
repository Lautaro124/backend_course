import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BDOptions } from './common/configs/DbOptions.configs';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { ModuleModule } from './module/module.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(BDOptions),
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CourseModule,
    ModuleModule,
    ClassModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
