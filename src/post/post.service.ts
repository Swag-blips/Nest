import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { createPostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger();

  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(postDto: createPostDto, authorId: mongoose.Types.ObjectId) {
    this.logger.log('Create post hit');
    this.logger.log('authorId here', authorId);
    
    const { title, body } = postDto;
    const post = await this.postModel.create({
      authorId,
      title,
      body,
    });

    return post;
  }

  async getPosts() {
    const posts = await this.postModel.find();

    return posts;
  }
}
