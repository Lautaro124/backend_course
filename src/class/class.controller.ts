import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { AuthGuard } from '@nestjs/passport';

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
}
