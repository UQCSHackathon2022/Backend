import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  sID: number;
  @Prop({ required: true, lowercase: true })
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
export const UserSchema = SchemaFactory.createForClass(User);
