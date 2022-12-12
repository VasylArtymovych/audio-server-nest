import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AddTrackDto } from './dto/add-track.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album, AlbumDocument } from './schema/album.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async create(dto: CreateAlbumDto): Promise<Album> {
    if (!dto.name || !dto.artist) {
      throw new BadRequestException('Missing required fiels.');
    }
    const findAlbum = await this.albumModel.findOne({ name: dto.name });
    if (findAlbum) {
      throw new BadRequestException(
        `Album with name: <${dto.name}>, already exist.`,
      );
    }
    const album = await this.albumModel.create({ ...dto });
    return album;
  }

  async getAll(): Promise<Album[]> {
    const tracks = await this.albumModel.find({});
    return tracks;
  }

  async search(query: string): Promise<Album[]> {
    const albums = await this.albumModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return albums;
  }

  async addTrack(
    trackId: ObjectId,
    dto: AddTrackDto,
  ): Promise<{ message: string }> {
    const album = await this.albumModel.findOneAndUpdate(
      { name: dto.albumName },
      { $push: { tracks: trackId } },
    );

    if (!album) {
      throw new BadRequestException(
        `Album with name: <${dto.albumName}>, not found.`,
      );
    }
    return { message: 'Track added' };
  }
}
