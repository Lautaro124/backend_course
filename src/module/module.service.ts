import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Module from 'src/common/entity/modules.entity';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module) private moduleRepository: Repository<Module>,
  ) {}

  async getModules(courseId: string) {
    console.log('🚀 ~ ModuleService ~ getModules ~ courseId:', courseId);
    return await this.moduleRepository.find({
      where: { courseId: courseId },
      // relations: ['classes', 'courseId'],
    });
  }

  async createModule(module: CreateModuleDto) {
    return await this.moduleRepository.save(module);
  }
}
