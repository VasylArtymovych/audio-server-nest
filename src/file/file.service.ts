import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export enum FileType {
  PICTURE = 'image',
  AUDIO = 'audio',
}

@Injectable()
export class FileService {
  async uploadFile(type: FileType, file): Promise<string> {
    try {
      const fileExtention = file.originalname.split('.').pop();
      const fileName = uuidv4() + '.' + fileExtention;
      const filePath = join(__dirname, '..', 'static', type);
      if (!(await fs.stat(filePath))) {
        await fs.mkdir(filePath, { recursive: true });
      }
      fs.writeFile(join(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteFile(picture, audio) {
    try {
      const picturePath = join(__dirname, '..', 'static', picture);
      const audioPath = join(__dirname, '..', 'static', audio);
      await fs.unlink(picturePath);
      await fs.unlink(audioPath);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
