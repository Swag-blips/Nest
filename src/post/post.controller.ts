import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { createPostDto, updatePostDto } from './dto/post.dto';
import { PostService } from './post.service';
import mongoose from 'mongoose';

@Controller('post')
export class PostController {
  private readonly logger = new Logger();
  constructor(private postService: PostService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createPost(@Body() postDto: createPostDto, @Request() req) {
    const post = await this.postService.createPost(postDto, req.userId);
    return post;
  }

  @Get()
  async getPosts() {
    const posts = await this.postService.getPosts();
    return posts;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getPostById(@Param('id') id: mongoose.Types.ObjectId) {
    const post = await this.postService.getPostbyId(id);
    return post;
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: mongoose.Types.ObjectId, @Request() req) {
    const post = await this.postService.deletePost(id, req.userId);

    return post;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updatePost(
    @Body() updatePostDto: updatePostDto,
    @Param('id') id: mongoose.Types.ObjectId,
    @Request() req,
  ) {
    const updatedPost = await this.postService.editPost(
      updatePostDto,
      id,
      req.userId,
    );
    return updatedPost;
  }
}
