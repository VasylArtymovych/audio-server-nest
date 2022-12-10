import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Track } from './track.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ versionKey: false })
export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({ type: Types.ObjectId })
  trackId: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
