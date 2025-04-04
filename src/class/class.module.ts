import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import Class from 'src/common/entity/class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModuleDb from 'src/common/entity/modules.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, ModuleDb])],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
