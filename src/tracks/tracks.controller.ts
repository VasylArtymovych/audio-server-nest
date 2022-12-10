import {
  Body,
  Controller,
  Delete,
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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TracksService } from './tracks.service';
import { ObjectId } from 'mongoose';

@Controller('tracks')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;
    if (!picture || !audio) {
      throw new HttpException('Missing required files', HttpStatus.BAD_REQUEST);
    }
    return this.trackService.create(dto, picture[0], audio[0]);
  }

  @Get()
  getAll(@Query('limit') limit, @Query('page') page) {
    return this.trackService.getAll(limit, page);
  }

  @Get('/search')
  searchByName(@Query('query') query: string) {
    return this.trackService.searchByName(query);
  }

  @Get('/:id')
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Patch('/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  update(
    @Param('id') id: ObjectId,
    @UploadedFiles() files,
    @Body() dto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, dto, files);
  }

  @Delete('/:id')
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
