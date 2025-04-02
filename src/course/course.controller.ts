import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createCourse(@Body() createCourseDto: CreateCourseDto) {
    return await this.courseService.createCourse(createCourseDto);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return await this.courseService.findAll();
  }
}
