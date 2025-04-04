import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateInscriptionDto {
  @ApiProperty({ description: 'ID del usuario que se inscribe' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'ID del módulo al que se inscribe' })
  @IsNotEmpty()
  @IsNumber()
  moduleId: number;

  @ApiProperty({ description: 'ID del curso al que se inscribe' })
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @ApiProperty({
    description: 'Fecha de inscripción (opcional)',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date?: string;
}
