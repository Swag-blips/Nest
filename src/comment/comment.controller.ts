import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { createCommentDto } from './dto/comment.dto';
import mongoose from 'mongoose';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  async createComment(
    @Param('id') id: mongoose.Types.ObjectId,
    @Request() req,
    @Body() createCommentDto: createCommentDto,
  ) {
    const comment = this.commentService.createComment(
      createCommentDto,
      id,
      req.userId,
    );

    return comment;
  }

  @UseGuards(AuthGuard)
  @Get()
  async getCommentsByUser(@Request() req) {
    const comments = await this.commentService.getCommentsByUser(req.userId);

    return comments;
  }
}
