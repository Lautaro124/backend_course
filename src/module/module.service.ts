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

  async getModules(courseId: number) {
    return await this.moduleRepository.find({
      where: { course: { id: courseId } },
      relations: ['classes', 'course'],
    });
  }

  async createModule(module: CreateModuleDto) {
    return await this.moduleRepository.save(module);
  }
}
