import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PaperDocument = Paper & Document;

@Schema()
export class Paper {
  @Prop({ required: true, unique: true })
  ID: number;
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
  @Prop({ required: true })
  fName: string;
  @Prop({ required: true })
  lName: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  courses: string[];
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const PaperSchema = SchemaFactory.createForClass(Paper);
