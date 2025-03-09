import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return await this.courseService.createCourse(createCourseDto);
  }

  @Get('all')
  // @UseGuards(AuthGuard)
  async findAll() {
    return await this.courseService.findAll();
  }
}
