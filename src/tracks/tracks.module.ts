import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from 'src/file/file.service';
import { Comment, CommentSchema } from './schema/comment.schema';
import { Track, TrackSchema } from './schema/track.schema';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [TracksController],
  providers: [TracksService, FileService],
})
export class TracksModule {}
