import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
export class AlbumModule {}
