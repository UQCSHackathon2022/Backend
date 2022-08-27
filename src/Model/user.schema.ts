import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Course } from './course.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  sID: number;
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
  @Prop({ required: true })
  fName: string;
  @Prop({ required: true })
  lName: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  courses: Course[];
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
