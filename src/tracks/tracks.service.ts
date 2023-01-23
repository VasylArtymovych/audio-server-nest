import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
    const picturePath = await this.fileService.uploadFile(
      FileType.PICTURE,
      picture,
    );
    const audioPath = await this.fileService.uploadFile(FileType.AUDIO, audio);
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
    const track = await (
      await this.trackModel.findById(id)
    ).populate('comments');
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.BAD_REQUEST);
    }
    return track;
  }

  async searchByName(query): Promise<Array<Track>> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
      // name: { $regex: new RegExp(query), $options: 'i' },
    });
    return tracks;
  }

  async update(id, dto, files): Promise<Track> {
    const { picture, audio } = files;
    if (picture) {
      const picturePath = await this.fileService.uploadFile(
        FileType.PICTURE,
        picture[0],
      );
      dto.picture = picturePath;
    }
    if (audio) {
      const audioPath = await this.fileService.uploadFile(
        FileType.AUDIO,
        audio[0],
      );
      dto.audio = audioPath;
    }
    const updatedTrack = await this.trackModel.findByIdAndUpdate(
      id,
      { ...dto },
      { new: true },
    );
    return updatedTrack;
  }

  async delete(id) {
    const deletedTrack = await this.trackModel.findByIdAndDelete(id);
    await this.fileService.deleteFile(deletedTrack.picture, deletedTrack.audio);
    return { message: 'success', id };
  }

  async addComment(dto): Promise<Comment> {
    const comment = await this.commentModel.create({ ...dto });
    await this.trackModel.updateOne(
      { _id: dto.trackId },
      { $push: { comments: comment._id } },
    );
    return comment;
  }

  async listen(id): Promise<{ listeners: number }> {
    const track = await this.trackModel.findById(id);
    if (!track) {
      throw new BadRequestException(`Track with ID: ${id} not found.`);
    }
    track.listeners += 1;
    await track.save();
    return { listeners: track.listeners };
  }
}
