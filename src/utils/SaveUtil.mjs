import fs from 'fs';
import path from 'path';

export class PathUtil {
  static async ensureDirExists(outputDir) {
    try {
      await fs.promises.mkdir(outputDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
      throw error;
    }
  }

  static getAbsolutePath(filePath) { 
    return path.resolve(filePath);
  }
}
