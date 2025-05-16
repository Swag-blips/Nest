import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { createPostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  private readonly logger = new Logger();
  constructor(private postService: PostService) {}
  @UseGuards(AuthGuard)
  @Post('create')
  async createPost(@Body() postDto: createPostDto, @Request() req) {
    const post = await this.postService.createPost(postDto, req.userId);
    return post;
  }

  async getPosts() { 
    const posts = await this.postService.getPosts();
    return posts;
  }
}
