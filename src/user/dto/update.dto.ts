import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly fullName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly password?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly ocupation?: string;
}

export class ChangeEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newEmail: string;
}
