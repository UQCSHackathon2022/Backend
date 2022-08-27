import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true, uppercase: true })
  prefix: string;
  @Prop({ required: true})
  suffix: number;
  @Prop({ required: true })
  title: string;
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const CourseSchema = SchemaFactory.createForClass(Course);
