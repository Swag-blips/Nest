import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { createPostDto, updatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger();

  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(postDto: createPostDto, authorId: mongoose.Types.ObjectId) {
    try {
      const { title, body } = postDto;
      const post = await this.postModel.create({
        authorId,
        title,
        body,
      });

      return { success: true, post };
    } catch (error) {
      throw error;
    }
  }

  async getPosts() {
    try {
      const posts = await this.postModel
        .find()
        .populate('authorId', 'username email');

      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getPostbyId(postId: mongoose.Types.ObjectId) {
    try {
      const post = await this.postModel
        .findById(postId)
        .populate('authorId', 'email username');

      if (!post) {
        throw new NotFoundException();
      }

      return post;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(
    postId: mongoose.Types.ObjectId,
    authorId: mongoose.Types.ObjectId,
  ) {
    this.logger.log(authorId);
    try {
      const post = await this.getPostById(postId);

      if (!post) {
        throw new NotFoundException();
      }

      if (post.authorId.toString() !== authorId.toString()) {
        throw new UnauthorizedException();
      }

      await this.postModel.findByIdAndDelete(postId);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async editPost(
    updatePostDto: updatePostDto,
    postId: mongoose.Types.ObjectId,
    authorId: mongoose.Types.ObjectId,
  ) {
    const { title, body } = updatePostDto;
    if (!title && !body) {
      throw new BadRequestException('title or body is required');
    }

    const post = await this.getPostById(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId.toString() !== authorId.toString()) {
      throw new UnauthorizedException('Not allowed to delete this post');
    }

    post.title = title || post.title;
    post.body = body || post.body;

    await post.save();

    return { success: true, message: 'Post successfuly updated' };
  }

  async getUserPosts(authorId: mongoose.Types.ObjectId) {
    const posts = await this.postModel.find({
      authorId,
    });

    if (!posts.length) {
      return { success: true, posts: [] };
    }

    return { success: true, posts };
  }

  private async getPostById(postId: mongoose.Types.ObjectId) {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      throw new BadRequestException();
    }
    const post = this.postModel.findById(postId);
    return post;
  }
}
