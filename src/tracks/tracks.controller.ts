import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateTrackDto } from './dto/create-track.dto';
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

  // @Get()
  // getAll() {}

  // @Get(':id')
  // getOne() {}

  // @Put(':id')
  // update() {}

  // @Delete(':id')
  // delete() {}
}
