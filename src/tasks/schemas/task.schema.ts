import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ required: true })
  owner: string; // or mongoose.Schema.Types.ObjectId
}

export const TaskSchema = SchemaFactory.createForClass(Task);
