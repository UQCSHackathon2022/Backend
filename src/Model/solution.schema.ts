import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Paper } from './paper.schema';
import { User } from './user.schema';

export type SolutionDocument = Solution & Document;

@Schema()
export class Solution {
  @Prop({ required: true, unique: true })
  ID: number;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Paper' })
  paper: Paper;
  @Prop({ required: true })
  questionNumber: number;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  postedBy: User;
  @Prop({ default: Date.now() })
  createdDate: Date;
}
export const SolutionSchema = SchemaFactory.createForClass(Solution);
