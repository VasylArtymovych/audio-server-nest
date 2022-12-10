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
import { TracksService } from './tracks.service';

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

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.trackService.getOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  update(
    @Param('id') id: string,
    @UploadedFiles() files,
    @Body() dto: UpdateTrackDto,
  ) {
    const { picture, audio } = files;
    console.log('files', files, picture);
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.trackService.delete(id);
  }
}
