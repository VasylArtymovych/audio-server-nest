import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Track } from 'src/tracks/schema/track.schema';

export type AlbumDocument = HydratedDocument<Album>;

@Schema({ versionKey: false })
export class Album {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
