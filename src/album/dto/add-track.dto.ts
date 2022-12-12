import { ObjectId } from 'mongoose';

export class AddTrackDto {
  readonly albumName: string;
  readonly trackId: ObjectId;
}
