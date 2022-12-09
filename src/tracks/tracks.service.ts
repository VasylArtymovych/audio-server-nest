import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { Comment, CommentDocument } from './schema/comment.schema';
import { Track, TrackDocument } from './schema/track.schema';

@Injectable()
export class TracksService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}
  async create(dto, picture, audio) {
    const picturePath = this.fileService.uploadFile(FileType.PICTURE, picture);
    const audioPath = this.fileService.uploadFile(FileType.AUDIO, audio);
    const track = await this.trackModel.create({
      ...dto,
      listeners: 0,
      picture: picturePath,
      audio: audioPath,
    });

    return track;
  }

  // getAll() {}

  // getOne() {}

  // update() {}

  // delete() {}
}
