import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Module from 'src/common/entity/modules.entity';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import Course from 'src/common/entity/course.entity';

@Injectable()
export class ModuleService {
  private readonly logger = new Logger(ModuleService.name);
  constructor(
    @InjectRepository(Module) private moduleRepository: Repository<Module>,
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}

  async getModules(courseId: string) {
    try {
      console.log('🚀 ~ ModuleService ~ getModules ~ courseId:', courseId);
      return await this.moduleRepository.find({
        where: {
          course: {
            id: Number(courseId),
          },
        },
        relations: ['classes', 'course'],
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error fetching modules: ${error.message}`);
      } else {
        this.logger.error('Error fetching modules: Unknown error');
      }
      throw new Error('Failed to fetch modules');
    }
  }

  async createModule(module: CreateModuleDto) {
    try {
      this.logger.log('Creating a new module...');
      const course = await this.courseRepository.findOne({
        where: { id: module.courseId },
      });
      if (!course) {
        this.logger.error(`Course with ID ${module.courseId} not found`);
        throw new Error('Course not found');
      }

      const newModule = new Module();
      newModule.name = module.name;
      newModule.description = module.description;
      newModule.price = module.price;
      newModule.course = course;

      return await this.moduleRepository.save(newModule);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error creating module: ${error.message}`);
      } else {
        this.logger.error('Error creating module: Unknown error');
      }
      throw new Error('Failed to create module');
    }
  }
}
