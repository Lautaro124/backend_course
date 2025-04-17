import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDateString,
  IsBoolean,
  Min,
  Max,
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
  enrolledDate?: string; // Renombrado para consistencia

  @ApiProperty({
    description: 'Progreso de la inscripción (0-100)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress?: number;

  @ApiProperty({
    description: 'Indica si la inscripción es gratuita',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiProperty({
    description: 'Indica si el curso/módulo está completado',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({
    description: 'Indica si el curso/módulo está en progreso',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isInProgress?: boolean;

  @ApiProperty({
    description: 'Indica si el curso/módulo no ha sido iniciado',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isNotStarted?: boolean;
}
