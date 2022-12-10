import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(dto, picture, audio): Promise<Track> {
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

  async getAll(limit = 10, page = 1): Promise<Array<Track>> {
    const skip = (Number(page) - 1) * Number(limit);
    const tracks = await this.trackModel.find().skip(skip).limit(Number(limit));
    return tracks;
  }

  async getOne(id): Promise<Track> {
    const track = await this.trackModel.findById(id);
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.BAD_REQUEST);
    }
    return track;
  }

  async update(id, dto): Promise<Track> {
    const updatedTrack = this.trackModel.findByIdAndUpdate(
      id,
      { ...dto },
      { new: true },
    );
    return updatedTrack;
  }

  async delete(id) {
    const deletedTrack = await this.trackModel.findByIdAndDelete(id);
    console.log(deletedTrack);
    return { message: 'success' };
  }
}
