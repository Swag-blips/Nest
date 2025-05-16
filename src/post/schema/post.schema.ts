import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  authorId: mongoose.Types.ObjectId;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
    default: [],
  })
  comments: mongoose.Types.ObjectId;
}

export type PostDocument = HydratedDocument<Post>;
export const postSchema = SchemaFactory.createForClass(Post);
