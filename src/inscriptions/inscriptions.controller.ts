import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { CreateInscriptionDto } from './dto/create-incription.dto';

@Controller('inscriptions')
export class InscriptionsController {
  constructor(private readonly inscriptionsService: InscriptionsService) {}

  // @HttpCode(HttpStatus.OK)
  // @Get('user/:email')
  // async getUserInscriptionByEmail(@Param('email') email: string) {
  //   return await this.inscriptionsService.findUserInscriptionByEmail(email);
  // }

  //   @Post()
  //   @HttpCode(HttpStatus.OK)
  //   async createInscription(@Body() inscription: CreateInscriptionDto) {
  //     return await this.inscriptionsService.create(inscription);
  //   }
}
