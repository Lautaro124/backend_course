import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import Course from 'src/common/entity/course.entity';
import Module from 'src/common/entity/modules.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new Course();
    course.title = createCourseDto.title;
    course.description = createCourseDto.description;
    course.previewImage = createCourseDto.previewImage;

    course.modules = createCourseDto.modules.map((modDto) => {
      const module = new Module();
      module.name = modDto.name;
      module.description = modDto.description;
      module.price = modDto.price;
      return module;
    });

    return await this.courseRepository.save(course);
  }

  async findAll() {
    try {
      const course = await this.courseRepository.find();
      if (!course) {
        throw new Error('No courses found');
      }
      return course;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error('Failed to fetch courses');
    }
  }
}
