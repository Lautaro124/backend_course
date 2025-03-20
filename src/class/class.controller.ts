import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get(':module')
  @UseGuards(AuthGuard('jwt'))
  async getClassesByModule(@Param('module') module: string) {
    return this.classService.getClassesByModule(module);
  }
}
