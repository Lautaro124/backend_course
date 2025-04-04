import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  videoUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  moduleId: number;
}
