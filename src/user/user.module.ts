import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/entity/user.entitry';
import { TypeOrmModule } from '@nestjs/typeorm';
import Inscriptions from 'src/common/entity/inscriptions.entity';
import ModuleDb from 'src/common/entity/modules.entity';
import Class from 'src/common/entity/class.entity';
import Attachment from 'src/common/entity/attachment.entity';
import Course from 'src/common/entity/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Inscriptions,
      ModuleDb,
      Class,
      Attachment,
      Course,
    ]),
  ],
  providers: [UserService],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
