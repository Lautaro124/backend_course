import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Attachment from 'src/common/entity/attachment.entity';
import Class from 'src/common/entity/class.entity';
import Course from 'src/common/entity/course.entity';
import Inscriptions from 'src/common/entity/inscriptions.entity';
import ModuleDb from 'src/common/entity/modules.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inscriptions,
      ModuleDb,
      Class,
      Attachment,
      Course,
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
