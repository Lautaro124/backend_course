import { Controller, Get, Param, Post, UseGuards, Body } from '@nestjs/common';
import { ClassService } from './class.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get(':module/:class')
  @UseGuards(AuthGuard('jwt'))
  async getClass(
    @Param('module') module: string,
    @Param('class') className: string,
  ) {
    return this.classService.getClassesByModule(module, className);
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async createClass(@Body() body: CreateClassDto) {
    return await this.classService.createClass(body);
  }
}
