import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Course } from './course.schema';

export type PaperDocument = Paper & Document;

@Schema()
export class Paper {
  @Prop({ required: true })
  year: Date;
  @Prop({ required: true })
  semester: number;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const PaperSchema = SchemaFactory.createForClass(Paper);
