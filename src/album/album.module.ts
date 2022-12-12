import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { isValidId } from 'src/middleware/isValidId.middleware';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { Album, AlbumSchema } from './schema/album.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    TracksModule,
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isValidId)
      .forRoutes({ path: 'albums/add/:id', method: RequestMethod.PATCH });
  }
}
