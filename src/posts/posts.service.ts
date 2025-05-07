import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interface/post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First',
      content: 'First Post content',
      authorName: 'Sangam',
      createdAt: new Date(),
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const singlePost = this.posts.find((post) => post.id === id);

    if (!singlePost) {
      throw new NotFoundException(`Post with Id ${id} is not found`);
    }

    return singlePost;
  }
}
