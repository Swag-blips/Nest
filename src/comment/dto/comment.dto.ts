import { IsString } from 'class-validator';

export class createCommentDto {
  @IsString()
  content: string;
}
