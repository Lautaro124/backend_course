import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Class from 'src/common/entity/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import Module from 'src/common/entity/modules.entity';
@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
  ) {}

  async getClassesByModule(module: string, classId: string) {
    return this.classRepository.findOne({
      where: {
        id: parseInt(classId),
        module: { id: parseInt(module) },
      },
    });
  }

  async createClass(createClassDto: CreateClassDto) {
    const module = await this.moduleRepository.findOne({
      where: { id: createClassDto.moduleId },
    });
    if (!module) {
      throw new NotFoundException('Módulo no encontrado');
    }

    const newClass = new Class();
    newClass.title = createClassDto.title;
    newClass.description = createClassDto.description;
    newClass.videoUrl = createClassDto.videoUrl;
    newClass.module = module;

    return this.classRepository.save(newClass);
  }
}
