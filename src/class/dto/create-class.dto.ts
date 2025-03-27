import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  moduleId: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  videoUrl: string;

  // @IsArray()
  // @IsOptional()
  // attachments?: Attachment[];
}
