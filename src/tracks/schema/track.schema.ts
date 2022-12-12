import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Comment } from './comment.schema';

export type TrackDocument = HydratedDocument<Track>;

@Schema({ versionKey: false })
export class Track {
  @Prop({ required: true })
  name: string;

  @Prop()
  artist: string;

  @Prop()
  text: string;

  @Prop()
  listeners: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
