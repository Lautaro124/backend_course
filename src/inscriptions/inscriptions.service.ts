import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Inscriptions from 'src/common/entity/inscriptions.entity';
import { Repository } from 'typeorm';
import { CreateInscriptionDto } from './dto/create-incription.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InscriptionsService {
  private readonly logger = new Logger(InscriptionsService.name);
  constructor(
    @InjectRepository(Inscriptions)
    private inscriptionsRepository: Repository<Inscriptions>,
    private readonly userService: UserService,
  ) {}

  async create({ userId, courseId, moduleId }: CreateInscriptionDto) {
    try {
      this.logger.log('Creating a new inscription...');
      const newInscription = new Inscriptions();
      newInscription.userId = userId;
      newInscription.courseId = courseId;
      newInscription.moduleId = moduleId;
      newInscription.date = new Date();

      return await this.inscriptionsRepository.save(newInscription);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error creating inscription: ${error.message}`);
      } else {
        this.logger.error('Error creating inscription: Unknown error');
      }
      throw new Error('Error creating inscription');
    }
  }

  async findUserInscriptionByEmail(email: string) {
    try {
      this.logger.log(`Finding inscriptions for user with email: ${email}`);
      const user = await this.userService.findUserByEmail(email);
      if (!user) {
        this.logger.warn(`User with email ${email} not found`);
        return [];
      }
      const inscriptions = await this.inscriptionsRepository.find({
        relations: ['userId', 'courseId', 'moduleId'],
        where: { userId: user.id.toString() },
      });
      if (inscriptions.length === 0) {
        this.logger.warn(`No inscriptions found for user with email: ${email}`);
        return [];
      }
      return inscriptions;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error finding inscription by email: ${error.message}`,
        );
      } else {
        this.logger.error('Error finding inscription by email: Unknown error');
      }
      throw new Error('Error finding inscription by email');
    }
  }
}
