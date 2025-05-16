import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class createPostDto {
  @IsString()
  title: string;

  @IsString()
  body: string;
}

export class updatePostDto extends PartialType(createPostDto) {}
