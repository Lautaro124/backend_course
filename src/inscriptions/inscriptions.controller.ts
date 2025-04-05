import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { CreateInscriptionDto } from './dto/create-incription.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('inscriptions')
export class InscriptionsController {
  constructor(private readonly inscriptionsService: InscriptionsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('user/:id')
  @UseGuards(AuthGuard('jwt'))
  async getUserInscriptionById(@Param('id') id?: string) {
    if (!id || id === 'undefined') {
      console.log('ID:', id);
      return [];
    }
    return await this.inscriptionsService.findInscriptionByUsedId(Number(id));
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async createInscription(@Body() inscription: CreateInscriptionDto) {
    return await this.inscriptionsService.createInscription(inscription);
  }
}
