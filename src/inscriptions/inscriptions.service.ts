import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Inscriptions from 'src/common/entity/inscriptions.entity';
import { Repository } from 'typeorm';
import { CreateInscriptionDto } from './dto/create-incription.dto';
import { User } from 'src/common/entity/user.entitry';
import Module from 'src/common/entity/modules.entity';
import Course from 'src/common/entity/course.entity';

@Injectable()
export class InscriptionsService {
  private readonly logger = new Logger(InscriptionsService.name);
  constructor(
    @InjectRepository(Inscriptions)
    private inscriptionsRepository: Repository<Inscriptions>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Module)
    private moduleRepository: Repository<Module>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findByUserId(userId: number): Promise<Inscriptions[]> {
    try {
      const inscriptions = await this.inscriptionsRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['user', 'module', 'course'],
      });
      if (!inscriptions || inscriptions.length === 0) {
        this.logger.warn(
          `No se encontraron inscripciones para el userId: ${userId}`,
        );
        return [];
      }

      return inscriptions;
    } catch (error) {
      this.logger.error('Error al buscar inscripciones por userId', error);
      throw error;
    }
  }

  async createInscription(
    createInscriptionDto: CreateInscriptionDto,
  ): Promise<Inscriptions> {
    const { userId, moduleId, courseId, date } = createInscriptionDto;
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        this.logger.error(`Usuario no encontrado: ${userId}`);
        throw new NotFoundException('Usuario no encontrado');
      }

      const module = await this.moduleRepository.findOne({
        where: { id: moduleId },
      });
      if (!module) {
        this.logger.error(`Módulo no encontrado: ${moduleId}`);
        throw new NotFoundException('Módulo no encontrado');
      }

      const course = await this.courseRepository.findOne({
        where: { id: courseId },
      });
      if (!course) {
        this.logger.error(`Curso no encontrado: ${courseId}`);
        throw new NotFoundException('Curso no encontrado');
      }

      const inscription = new Inscriptions();
      inscription.user = user;
      inscription.module = module;
      inscription.course = course;
      inscription.date = date ? new Date(date) : new Date();

      return await this.inscriptionsRepository.save(inscription);
    } catch (error) {
      this.logger.error('Error al crear la inscripción', error);
      throw error;
    }
  }
}
