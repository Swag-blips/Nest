import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comment.schema';
import mongoose, { Model } from 'mongoose';
import { PostService } from 'src/post/post.service';
import { createCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly postService: PostService,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async createComment(
    createCommentDto: createCommentDto,
    postId: mongoose.Types.ObjectId,
    authorId: mongoose.Types.ObjectId,
  ) {
    const { content } = createCommentDto;
    const post = await this.postService.getPostbyId(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = await this.commentModel.create({
      authorId,
      content,
      postId: post._id,
    });

    post.comments.push(comment._id);

    await post.save();
    return { success: true, comment };
  }
}
