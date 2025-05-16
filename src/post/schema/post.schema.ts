import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class postSchema {
  @Prop({ required: true })
  title: string;

  @Prop({ require: true })
  body: string;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
  authorId: mongoose.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: mongoose.Types.ObjectId;
}
