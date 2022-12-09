import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
export enum FileType {
  PICTURE = 'image',
  AUDIO = 'audio',
}

@Injectable()
export class FileService {
  uploadFile(type: FileType, file): string {
    try {
      const fileExtention = file.originalname.split('.').pop();
      const fileName = uuidv4() + '.' + fileExtention;
      const filePath = join(__dirname, '..', 'static', type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(join(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
