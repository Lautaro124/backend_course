import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get(':courseId')
  @UseGuards(AuthGuard('jwt'))
  async getModules(@Param('courseId') courseId: number) {
    return await this.moduleService.getModules(courseId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createModule(@Body() module: CreateModuleDto) {
    return await this.moduleService.createModule(module);
  }
}
