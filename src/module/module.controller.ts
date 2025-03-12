import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get(':courseId')
  async getModules(@Param('courseId') courseId: number) {
    return await this.moduleService.getModules(courseId);
  }

  @Post()
  async createModule(@Body() module: CreateModuleDto) {
    return await this.moduleService.createModule(module);
  }
}
