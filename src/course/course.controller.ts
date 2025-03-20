import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

interface RequestWithUser extends Request {
  user: {
    id: number;
  };
}

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

  @Get('my-courses')
  @UseGuards(AuthGuard('jwt'))
  async findUserCourses(@Req() req: RequestWithUser) {
    return await this.courseService.findUserCourses(req.user.id);
  }
}
