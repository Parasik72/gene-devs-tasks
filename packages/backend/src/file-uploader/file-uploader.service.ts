import { v4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { UploadedFile } from 'express-fileupload';
import { STATIC_PATH } from '../constants/paths.constants';

export class FileUploaderService {
  uploadFile(file: UploadedFile, dirPath: string): string {
    const filePath = this.generateFileName(file, dirPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, {recursive: true});
    }
    fs.writeFileSync(filePath, file.data);
    return path.relative(STATIC_PATH, filePath);
  }

  deleteFile(filePath: string): string | null {
    const fullPath = path.resolve(STATIC_PATH, filePath);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    fs.unlinkSync(fullPath);
    return fullPath;
  }

  private generateFileName(file: UploadedFile, dirPath: string): string {
    const extension = file.name.split('.').pop();
    let filePath;
    do {
      const fileName = v4();
      filePath = path.resolve(dirPath, fileName) + `.${extension}`;
    } while (fs.existsSync(filePath));
    return filePath;
  }
}
