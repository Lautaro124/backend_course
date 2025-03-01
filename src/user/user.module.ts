import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/entity/user.entitry';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
