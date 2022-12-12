import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AddTrackDto } from './dto/add-track.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  create(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }
  @Get()
  getAll() {
    return this.albumService.getAll();
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.albumService.search(query);
  }

  @Patch('/add')
  addTrack(@Body() dto: AddTrackDto) {
    return this.albumService.addTrack(dto);
  }
}
