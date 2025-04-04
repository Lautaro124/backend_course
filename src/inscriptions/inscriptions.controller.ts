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
  @Get('user/:email')
  @UseGuards(AuthGuard('jwt'))
  async getUserInscriptionByEmail(@Param('email') email: string) {
    return await this.inscriptionsService.findByEmail(email);
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async createInscription(@Body() inscription: CreateInscriptionDto) {
    return await this.inscriptionsService.createInscription(inscription);
  }
}
