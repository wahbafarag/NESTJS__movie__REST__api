import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
  async uploadFile(files: Express.Multer.File[], folder: string = 'img') {
    const destination = `${path}/uploads/${folder}`;
    await ensureDir(destination);
    const isUploaded = files.map(async (file) => {
      await writeFile(`${destination}/${file.originalname}`, file.buffer);
      return {
        url: `localhost:3000/uploads/${folder}/${file.originalname}`,
        name: file.originalname,
      };
    });
    return Promise.all(isUploaded);
  }
}
