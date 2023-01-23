import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { AlbumService } from './album.service';
import { AddTrackDto } from './dto/add-track.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
    const { picture } = files;
    if (!picture) {
      throw new HttpException('Missing require field.', HttpStatus.BAD_REQUEST);
    }
    return this.albumService.create(dto, picture[0]);
  }

  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.albumService.search(query);
  }

  @Patch('/add/:id')
  addTrack(@Param('id') id: ObjectId, @Body() dto: AddTrackDto) {
    return this.albumService.addTrack(id, dto);
  }
}
