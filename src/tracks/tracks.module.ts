import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
  // RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from 'src/file/file.service';
// import { isValidId } from 'src/middleware/isValidId.middleware';
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
  exports: [MongooseModule],
})
export class TracksModule {}
// export class TracksModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(isValidId)
//       .forRoutes(
//         { path: 'tracks/:id', method: RequestMethod.PATCH },
//         { path: 'tracks/:id', method: RequestMethod.DELETE },
//         { path: 'tracks/listen/:id', method: RequestMethod.POST },
//       );
//   }
// }
