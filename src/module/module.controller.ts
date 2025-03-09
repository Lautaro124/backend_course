import { Controller, Get, Param } from '@nestjs/common';
import { ModuleService } from './module.service';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get(':courseId')
  async getModules(@Param('courseId') courseId: number) {
    return await this.moduleService.getModules(courseId);
  }
}
