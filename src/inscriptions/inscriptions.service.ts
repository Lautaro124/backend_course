import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Inscriptions from 'src/common/entity/inscriptions.entity';
import { Repository } from 'typeorm';
import { CreateInscriptionDto } from './dto/create-incription.dto';
import { User } from 'src/common/entity/user.entitry';
import Module from 'src/common/entity/modules.entity';
import Course from 'src/common/entity/course.entity';
import { ICourseWithModules } from './interface/responseFindByUserId.interface';
import { CourseInfo } from './interface/courseInfo.interface';
import { ModuleInfo } from './interface/moduleInfo.interface';

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

  async findInscriptionByUsedId(userId: number): Promise<ICourseWithModules[]> {
    try {
      const courses = await this.courseRepository.find({
        relations: ['modules'],
      });

      const inscriptions = await this.inscriptionsRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['module', 'course'],
      });

      const enrolledModules = new Map<number, ModuleInfo>();
      const enrolledCourses = new Map<number, CourseInfo>();

      inscriptions.forEach((inscription) => {
        if (inscription.module) {
          enrolledModules.set(inscription.module.id, {
            enrolledDate: inscription.enrolledDate,
            progress: inscription.progress,
            isFree: inscription.isFree,
            isCompleted: inscription.isCompleted,
            isInProgress: inscription.isInProgress,
            isNotStarted: inscription.isNotStarted,
          });
        }

        if (inscription.course) {
          const existingCourseInfo = enrolledCourses.get(inscription.course.id);
          const courseInfo: CourseInfo = existingCourseInfo || {
            enrolledDate: inscription.enrolledDate,
            progress: 0,
            modules: 0,
            completedModules: 0,
            isFree: inscription.isFree,
            isCompleted: inscription.isCompleted,
            isInProgress: inscription.isInProgress,
            isNotStarted: inscription.isNotStarted,
          };

          // Actualizar el progreso del curso basado en módulos
          if (inscription.module) {
            courseInfo.modules++;
            if (inscription.isCompleted) {
              courseInfo.completedModules++;
            }
          }

          enrolledCourses.set(inscription.course.id, courseInfo);
        }
      });

      enrolledCourses.forEach((value) => {
        if (value.modules > 0) {
          value.progress = Math.round(
            (value.completedModules / value.modules) * 100,
          );
        }
      });

      const result = courses.map((course) => {
        const courseInfo = enrolledCourses.get(course.id) || {
          progress: 0,
          modules: 0,
          completedModules: 0,
        };
        const isPushed = enrolledCourses.has(course.id);

        return {
          ...course,
          isPushed,
          enrolledDate: courseInfo.enrolledDate,
          progress: courseInfo.progress || 0,
          isFree: courseInfo.isFree,
          isCompleted: courseInfo.isCompleted,
          isInProgress: courseInfo.isInProgress,
          isNotStarted: courseInfo.isNotStarted,
          modules: course.modules.map((module) => {
            const moduleInfo = enrolledModules.get(module.id) || {};
            return {
              ...module,
              isPushed: enrolledModules.has(module.id),
              enrolledDate: moduleInfo.enrolledDate,
              progress: moduleInfo.progress || 0,
              isFree:
                moduleInfo.isFree !== undefined
                  ? moduleInfo.isFree
                  : module.price === 0,
              isCompleted: moduleInfo.isCompleted,
              isInProgress: moduleInfo.isInProgress,
              isNotStarted: moduleInfo.isNotStarted,
            };
          }),
        };
      });

      return result;
    } catch (error) {
      this.logger.error(
        'Error al obtener los cursos con estado de inscripción',
        error,
      );
      throw error;
    }
  }

  async createInscription(
    createInscriptionDto: CreateInscriptionDto,
  ): Promise<Inscriptions> {
    const {
      userId,
      moduleId,
      courseId,
      enrolledDate,
      progress,
      isFree,
      isCompleted,
      isInProgress,
      isNotStarted,
    } = createInscriptionDto;

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

      // Verificar si ya existe una inscripción para evitar duplicados
      const existingInscription = await this.inscriptionsRepository.findOne({
        where: {
          user: { id: userId },
          module: { id: moduleId },
          course: { id: courseId },
        },
      });

      if (existingInscription) {
        this.logger.log(`La inscripción ya existe, actualizando datos`);
        // Actualizar la inscripción existente
        if (progress !== undefined) existingInscription.progress = progress;
        if (isFree !== undefined) existingInscription.isFree = isFree;
        if (isCompleted !== undefined)
          existingInscription.isCompleted = isCompleted;
        if (isInProgress !== undefined)
          existingInscription.isInProgress = isInProgress;
        if (isNotStarted !== undefined)
          existingInscription.isNotStarted = isNotStarted;

        return await this.inscriptionsRepository.save(existingInscription);
      }

      const inscription = new Inscriptions();
      inscription.user = user;
      inscription.module = module;
      inscription.course = course;
      inscription.enrolledDate = enrolledDate
        ? new Date(enrolledDate)
        : new Date();
      inscription.progress = progress ?? 0;
      inscription.isFree = isFree ?? module.price === 0;
      inscription.isCompleted = isCompleted ?? false;
      inscription.isInProgress = isInProgress ?? false;
      inscription.isNotStarted = isNotStarted ?? true;

      return await this.inscriptionsRepository.save(inscription);
    } catch (error) {
      this.logger.error('Error al crear la inscripción', error);
      throw error;
    }
  }
}
