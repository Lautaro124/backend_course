import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import Course from 'src/common/entity/course.entity';
import Inscriptions from 'src/common/entity/inscriptions.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Inscriptions)
    private inscriptionsRepository: Repository<Inscriptions>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto) {
    return await this.courseRepository.save(createCourseDto);
  }

  async findAll() {
    try {
      const course = await this.courseRepository.find();
      return course.sort((a, b) =>
        a.isPurchased === b.isPurchased ? 0 : a.isPurchased ? -1 : 1,
      );
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error('Failed to fetch courses');
    }
  }

  async findUserCourses(userId: number) {
    try {
      const inscriptions = await this.inscriptionsRepository.find({
        where: {
          user: { id: userId },
        },
        relations: ['course'],
      });

      return inscriptions.map((inscription) => inscription.course);
    } catch (error) {
      console.error('Error fetching user courses:', error);
      throw new Error('Failed to fetch user courses');
    }
  }
}
