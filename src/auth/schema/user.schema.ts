import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;
  @Prop({ required: true, unique: true, index: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  bio: string;
}

export type UserDocument = HydratedDocument<User>;

export const userSchema = SchemaFactory.createForClass(User);
