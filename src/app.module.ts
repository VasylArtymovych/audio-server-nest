import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TracksModule } from './tracks/tracks.module';
import config from './config/configuration';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    MongooseModule.forRoot(config().database.host),
    TracksModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
