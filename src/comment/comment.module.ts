import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { commentSchema } from './schema/comment.schema';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    AuthModule,
    PostModule,
    MongooseModule.forFeature([{ name: 'Comment', schema: commentSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
