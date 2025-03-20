import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Class from 'src/common/entity/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async getClassesByModule(module: string) {
    return this.classRepository.find({
      where: {
        module: { id: parseInt(module) },
      },
    });
  }
}
