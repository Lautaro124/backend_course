import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModuleDB from 'src/common/entity/modules.entity';
import Course from 'src/common/entity/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleDB, Course])],
  providers: [ModuleService],
  controllers: [ModuleController],
})
export class ModuleModule {}
