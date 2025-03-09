import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ModuleDB from 'src/common/entity/modules.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleDB])],
  providers: [ModuleService],
  controllers: [ModuleController],
})
export class ModuleModule {}
